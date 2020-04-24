import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateInstructorDto {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
