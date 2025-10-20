import { Injectable } from '@nestjs/common';
import { GroupSummary } from '@fludge/entities/group.entity';
import { slugify } from '@/core/shared/utils/slugify';
import { GroupsQueriesRepository } from '@/core/businesses/repositories/groups/groups-queries.repository';
import { GroupsCommandsRepository } from '@/core/businesses/repositories/groups/groups-commands.repository';
import { GroupAlreadyExistsException } from '@/core/businesses/exceptions/group-already-exists.exception';
import type { UpdateGroupDto } from '@/core/businesses/dtos/groups/update-group.dto';

@Injectable()
export class UpdateGroupUseCase {
  constructor(
    private readonly groupsQueriesRepository: GroupsQueriesRepository,
    private readonly groupsCommandsRepository: GroupsCommandsRepository,
  ) {}

  public async execute(
    businessId: string,
    groupSlug: string,
    data: UpdateGroupDto,
  ) {
    if (!data.name && !data.description && !data.permissions) {
      return;
    }

    const existingGroupsInBusiness =
      await this.groupsQueriesRepository.findManyBy(
        {
          businessId,
        },
        {
          ensureActive: true,
        },
      );

    const currentGroup = existingGroupsInBusiness.find(
      (group) => group.slug === groupSlug,
    );

    if (!currentGroup) throw new GroupAlreadyExistsException();

    if (
      data.name === currentGroup.name &&
      data.description === currentGroup.description &&
      data.permissions === currentGroup.permissions
    ) {
      return;
    }

    const groupsInBusiness: GroupSummary[] = existingGroupsInBusiness.filter(
      (group) => group.id !== groupSlug,
    );

    const nameIsOccupied = groupsInBusiness.some(
      (group) => group.name === data.name,
    );

    if (nameIsOccupied) {
      throw new GroupAlreadyExistsException(
        'El nombre de grupo ya esta ocupado',
      );
    }

    await this.groupsCommandsRepository.save({
      id: currentGroup.id,
      businessId,
      name: data.name ?? currentGroup.name,
      description: data.description ?? currentGroup.description,
      permissions: Array.from(
        new Set(data.permissions ?? currentGroup.permissions),
      ),
      slug: data.name ? slugify(data.name) : currentGroup.slug,
    });
  }
}
