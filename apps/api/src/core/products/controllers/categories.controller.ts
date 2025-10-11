import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CreateCategoryUsecase } from '../use-cases/create-category.usecase';
import { FindManyCategoriesUsecase } from '../use-cases/find-many-categories.usecase';
import { FindOneCategoryUsecase } from '../use-cases/find-one-category.usecase';
import { DeleteManyCategoriesDto } from '../dtos/delete-many-categories';
import { DeleteManyCategoriesUsecase } from '../use-cases/delete-many-categories.usecase';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { UpdateCategoryUseCase } from '../use-cases/update-category.usecase';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { HTTPResponse } from '@/core/shared/http/response';
import { safeAction } from '@/core/shared/http/safe-action';
import { GetBusiness } from '@/core/businesses/decorators/get-business.decorator';

@Controller('business/:businessSlug/categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly findManyCategoriesUsecase: FindManyCategoriesUsecase,
    private readonly findOneCategoryUsecase: FindOneCategoryUsecase,
    private readonly deleteManyCategoriesUsecase: DeleteManyCategoriesUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUseCase,
  ) {}

  @Post()
  @Permissions('categories:create')
  public async create(
    @GetBusiness('id') businessId: string,
    @Body() data: CreateCategoryDto,
  ) {
    await safeAction(
      () => this.createCategoryUsecase.execute(businessId, data),
      'Algo salió mal al crear la categoría',
    );

    return HTTPResponse.created(null);
  }

  @Get()
  @Permissions('categories:read')
  public async findMany(@GetBusiness('id') businessId: string) {
    const categories = await safeAction(
      () => this.findManyCategoriesUsecase.execute(businessId),
      'Algo salió mal al buscar categorías',
    );

    return HTTPResponse.ok(categories);
  }

  @Get('/:categoryId')
  @Permissions('categories:read')
  public async findOne(
    @GetBusiness('id') businessId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const category = await safeAction(
      () => this.findOneCategoryUsecase.execute(businessId, categoryId),
      'Algo salió mal al buscar categorías',
    );

    return HTTPResponse.ok(category);
  }

  @Delete('/delete-many')
  @Permissions('categories:delete')
  public async deleteMany(
    @GetBusiness('id') businessId: string,
    @Body() data: DeleteManyCategoriesDto,
  ) {
    await safeAction(
      () => this.deleteManyCategoriesUsecase.execute(businessId, data),
      'Algo salió mal al eliminar categorías',
    );

    return HTTPResponse.ok(null);
  }

  @Patch('/:categoryId')
  @Permissions('categories:update')
  public async update(
    @GetBusiness('id') businessId: string,
    @Param('categoryId') categoryId: string,
    @Body() data: UpdateCategoryDto,
  ) {
    await safeAction(
      () => this.updateCategoryUsecase.execute(businessId, categoryId, data),
      'Algo salió mal al actualizar la categoría',
    );

    return HTTPResponse.ok(null);
  }
}
