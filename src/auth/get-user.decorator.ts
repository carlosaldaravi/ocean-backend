import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Student } from 'src/entity/student.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Student => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  });

