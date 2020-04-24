import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    console.log('payload: ', authCredentialsDto);
    try {
      const email = await this.userRepository.validateUserPassword(authCredentialsDto);

      if (!email) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
      
      return { accessToken };

    } catch (error) {
      throw error;
    }
  }
}
