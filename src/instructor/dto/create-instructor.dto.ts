import { IsNotEmpty, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator';
import { User } from 'src/entity/user.entity';

export class CreateInstructorDto {

  @IsNotEmpty()
  userId: User;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  dateBorn: Date;

  @IsOptional()
  city: string;

  @IsOptional()
  availability: string;
}
