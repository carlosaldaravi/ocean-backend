import { Controller, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger('InstructorController');
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    this.logger.verbose(`Creating a new user. Data: ${JSON.stringify(authCredentialsDto)}`);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
    this.logger.verbose(`Signin. Data: ${JSON.stringify(authCredentialsDto)}`);
    return this.authService.signIn(authCredentialsDto);
  }

}
