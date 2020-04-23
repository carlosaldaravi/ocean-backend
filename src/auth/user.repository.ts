import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Student } from 'src/entity/student.entity';
import { StudentRepository } from 'src/student/student.repository';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   const { email, password } = authCredentialsDto;

  //   const user = this.create();
  //   user.email = email;
  //   user.salt = await bcrypt.genSalt();
  //   user.password = await this.hashPassword(password, user.salt);

  //   try {
  //     await user.save();
  //   } catch (error) {
  //     if (error.code === '23505') { // duplicate email
  //       throw new ConflictException('email already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    const student = await Student.findOne({ email });

    if (student && await student.validatePassword(password)) {
      return student.email;
    } else {
      return null;
    }
  }

  // private async hashPassword(password: string, salt: string): Promise<string> {
  //   return bcrypt.hash(password, salt);
  // }
}
