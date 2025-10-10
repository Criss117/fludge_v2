import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateBusinessUseCase } from '../use-cases/create-business.usecase';
import { CreateBusinessDto } from '../dtos/create-business.dto';
import { GetUser } from '@/core/auth/decorators/get-user.decorator';
import { UserNoRootException } from '@/core/users/exceptions/user-no-root.exception';
import { safeAction } from '@/core/shared/http/safe-action';
import { HTTPResponse } from '@/core/shared/http/response';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { GetBusiness } from '../decorators/get-business.decorator';
import type { UserDetail } from '@fludge/entities/user.entity';
import type { BusinessDetail } from '@fludge/entities/business.entity';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly createBusinessUseCase: CreateBusinessUseCase) {}

  @Post()
  public async create(
    @Body() data: CreateBusinessDto,
    @GetUser() user: UserDetail,
  ) {
    if (!user.isRoot) throw new UserNoRootException();

    const res = await safeAction(
      () => this.createBusinessUseCase.execute(data, user.id),
      'Algo salió mal al intentar crear la empresa',
    );

    return HTTPResponse.created(res);
  }

  @Get(':businessSlug')
  @Permissions('businesses:read')
  public async findOne(@GetBusiness() business: BusinessDetail) {
    if (!business) throw new InternalServerErrorException('Business not found');

    return HTTPResponse.ok(business);
  }
}
