import type { UserDetail } from '@fludge/entities/user.entity';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: keyof UserDetail, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as UserDetail;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);
