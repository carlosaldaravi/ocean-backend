import { IsNotEmpty, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator';
import { StudentSize } from '../student-size.enum';

export class CreateStudentDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: StudentSize;

  @IsNotEmpty()
  lastName: StudentSize;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  dateBorn: Date;

  @IsOptional()
  size: StudentSize;

  @IsOptional()
  knownWay: string;

  @IsOptional()
  city: string;

  @IsOptional()
  disponibilidad: string;
}
