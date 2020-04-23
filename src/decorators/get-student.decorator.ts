import { createParamDecorator } from '@nestjs/common';
import { Student } from 'src/entity/student.entity';

export const GetStudent = createParamDecorator((data, req): Student => {
  return req.student;
});
