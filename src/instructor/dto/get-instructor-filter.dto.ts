import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetStudentFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
