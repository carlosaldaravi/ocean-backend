import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentTargetDto {

  @IsNotEmpty()
  studentId: number;
  
  @IsNotEmpty()
  targetId: number;

  @IsNotEmpty()
  validatedBy: number;

  @IsOptional()
  feedback: string;

}
