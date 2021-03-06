import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Student } from 'src/entity/student.entity';
import { Instructor } from 'src/entity/instructor.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

    const user = this.create();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();

      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      if (error.code === '23505') { // duplicate email
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password } = authCredentialsDto;
    const user = await User.findOne({ email });
    
    if (user && await user.validatePassword(password)) {
      
      let rol = await this.getUserRol(user);
      let response = {
        email: user.email,
        rol
      }
      return response;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async getUserRol(user): Promise<string> {
    if (user.admin) return 'admin';

    let student = await Student.findOne({ userId: user.id });
    if (student) return 'student';

    let instructor = await Instructor.findOne({ userId: user.id });
    if (instructor) return 'instructor';

    return 'basic';

  }
}
