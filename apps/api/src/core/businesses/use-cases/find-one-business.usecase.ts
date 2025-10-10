import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessesQueriesRepository } from '../repositories/businesses-queries.repository';
import { BusinessNotFoundException } from '../exceptions/business-no-exists.exception';
import { UserCanNotAccessException } from '@/core/users/exceptions/user-cannot-access.exception';
import type { FindOneBusinessDto } from '../repositories/dtos/find-one-business.dto';

@Injectable()
export class FindOneBusinessUseCase {
  constructor(
    private readonly businessesQueriesRepository: BusinessesQueriesRepository,
  ) {}

  public async execute(meta: FindOneBusinessDto, logedUserId: string) {
    if (!meta.id && !meta.slug) {
      throw new BadRequestException('Invalid query');
    }

    const business = await this.businessesQueriesRepository.findOne(meta, {
      ensureActive: true,
    });

    if (!business) {
      throw new BusinessNotFoundException();
    }

    const logedUserIsRootOrEmployee =
      business.rootUserId === logedUserId ||
      business.employees.some((e) => e.id === logedUserId);

    if (!logedUserIsRootOrEmployee) {
      throw new UserCanNotAccessException();
    }

    if (business.rootUserId === logedUserId) {
      return business;
    }

    return {
      ...business,
      employees: business.employees.filter((e) => e.id === logedUserId),
    };
  }
}
