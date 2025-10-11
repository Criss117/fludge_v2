import { Injectable } from '@nestjs/common';
import { GroupsQueriesRepository } from '@/core/businesses/repositories/groups/groups-queries.repository';
import { GroupNotFoundException } from '@/core/businesses/exceptions/group-not-found.exception';

@Injectable()
export class FindOneGroupUseCase {
  constructor(
    private readonly groupsQueriesRepository: GroupsQueriesRepository,
  ) {}

  public async execute(businessId: string, groupSlug: string) {
    const group = await this.groupsQueriesRepository.findOne(
      {
        businessId,
        slug: groupSlug,
      },
      {
        ensureActive: true,
      },
    );

    if (!group) throw new GroupNotFoundException();

    return group;
  }
}
