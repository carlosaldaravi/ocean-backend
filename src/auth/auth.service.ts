import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entity/user.entity';
import { statusNetwork } from '../config/network'

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

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    try {
      
      const obj = await this.userRepository.validateUserPassword(authCredentialsDto);

      if(!obj){
        return {
          status: statusNetwork.UNAUTHORIZED,
          message: 'Invalid credentials'
        }
      }
      const email = obj.email;
      const rol = obj.rol;

      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
      
      let response = {
        data:{
          status: statusNetwork.SUCCESS,
          accessToken,
          rol
        }
      }
      console.log(response);
      return response;

    } catch (error) {
      throw error;
    }
  }
}
