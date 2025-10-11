import { Injectable, UnauthorizedException } from '@nestjs/common';
import { slugify } from '@/core/shared/utils/slugify';
import { GroupsCommandsRepository } from '@/core/businesses/repositories/groups/groups-commands.repository';
import type { CreateGroupDto } from '@/core/businesses/dtos/groups/create-group.dto';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly groupsCommandsRepository: GroupsCommandsRepository,
  ) {}

  public async execute(businessId: string, data: CreateGroupDto) {
    if (data.permissions.includes('businesses:delete')) {
      throw new UnauthorizedException(
        "You can't create a group with this permission",
      );
    }

    await this.groupsCommandsRepository.save({
      ...data,
      businessId,
      slug: slugify(data.name),
    });
  }
}
