import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { HTTPResponse } from '@/core/shared/http/response';
import { GetBusiness } from '@/core/businesses/decorators/get-business.decorator';
import { safeAction } from '@/core/shared/http/safe-action';
import { CreateGroupUseCase } from '../use-cases/groups/create-group.usecase';
import { FindOneGroupUseCase } from '../use-cases/groups/find-one-group.usecase';
import { UpdateGroupUseCase } from '../use-cases/groups/update-group.usecase';
import { CreateGroupDto } from '../dtos/groups/create-group.dto';
import { UpdateGroupDto } from '../dtos/groups/update-group.dto';

@Controller('businesses/:businessSlug/groups')
export class GroupsController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly findOneGroupUseCase: FindOneGroupUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
  ) {}

  @Post()
  @Permissions('groups:create')
  public async create(
    @GetBusiness('id') businessId: string,
    @Body() data: CreateGroupDto,
  ) {
    await safeAction(
      () => this.createGroupUseCase.execute(businessId, data),
      'Algo salió mal en la creación del grupo',
    );

    return HTTPResponse.created(null);
  }

  @Get(':groupSlug')
  @Permissions('groups:read')
  public async findOne(
    @GetBusiness('id') businessId: string,
    @Param('groupSlug') groupSlug: string,
  ) {
    const groups = await safeAction(
      () => this.findOneGroupUseCase.execute(businessId, groupSlug),
      'Algo salió mal en la búsqueda del grupo',
    );

    return HTTPResponse.ok(groups);
  }

  @Patch(':groupSlug')
  @Permissions('groups:read', 'groups:update')
  public async update(
    @GetBusiness('id') businessId: string,
    @Param('groupSlug') groupSlug: string,
    @Body() data: UpdateGroupDto,
  ) {
    await safeAction(
      () => this.updateGroupUseCase.execute(businessId, groupSlug, data),
      'Algo salió mal en la actualización del grupo',
    );

    return HTTPResponse.ok(null);
  }
}
