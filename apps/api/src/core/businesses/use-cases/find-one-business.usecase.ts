import { Injectable } from '@nestjs/common';
import { BusinessesQueriesRepository } from '../repositories/businesses-queries.repository';
import { BusinessNotFoundException } from '../exceptions/business-no-exists.exception';
import { UserCanNotAccessException } from '@/core/users/exceptions/user-cannot-access.exception';

@Injectable()
export class FindOneBusinessUseCase {
  constructor(
    private readonly businessesQueriesRepository: BusinessesQueriesRepository,
  ) {}

  public async execute(id: string, logedUserId: string) {
    const business = await this.businessesQueriesRepository.findOne(id, {
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
