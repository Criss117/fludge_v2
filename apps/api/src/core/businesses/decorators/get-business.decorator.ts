import { BusinessDetail } from '@fludge/entities/business.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BusinessNotFoundException } from '../exceptions/business-no-exists.exception';

export const GetBusiness = createParamDecorator(
  (keys: keyof BusinessDetail, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const business = req.business as BusinessDetail;

    if (!business)
      throw new BusinessNotFoundException('Business not found (request)');

    if (keys) return business[keys];

    return business;
  },
);
