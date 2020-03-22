import { StudentSize } from '../student-size.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetStudentFilterDto {
  @IsOptional()
  @IsIn([StudentSize.XS, StudentSize.S, StudentSize.M, StudentSize.L, StudentSize.XL])
  size: StudentSize;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
