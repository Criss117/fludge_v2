import { Injectable } from '@nestjs/common';
import { BusinessesCommandsRepository } from '../repositories/businesses-commands.repository';
import { BusinessesQueriesRepository } from '../repositories/businesses-queries.repository';
import { CreateBusinessDto } from '../dtos/create-business.dto';
import { BusinessAlreadyExistsException } from '../exceptions/business-already-exists.exception';
import { slugify } from '@/core/shared/utils/slugify';

@Injectable()
export class CreateBusinessUseCase {
  constructor(
    private readonly businessesCommandsRepository: BusinessesCommandsRepository,
    private readonly businessesQueriesRepository: BusinessesQueriesRepository,
  ) {}

  public async execute(data: CreateBusinessDto, rootUserId: string) {
    const existingBusiness = await this.businessesQueriesRepository.findManyBy(
      {
        name: data.name,
        nit: data.nit,
        slug: slugify(data.name),
      },
      {
        ensureActive: true,
      },
    );

    if (existingBusiness.length) throw new BusinessAlreadyExistsException();

    const businessSlug = slugify(data.name);

    return this.businessesCommandsRepository.saveAndReturn({
      address: data.address,
      city: data.city,
      name: data.name,
      nit: data.nit,
      rootUserId,
      slug: businessSlug,
    });
  }
}
