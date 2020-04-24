import { IsNotEmpty, IsOptional } from 'class-validator';
import { StudentSize } from '../student-size.enum';

export class CreateStudentDto {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

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
  availability: string;
}
