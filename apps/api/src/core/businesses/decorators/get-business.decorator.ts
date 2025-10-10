import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetBusiness = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const business = req.business;

  return business;
});
