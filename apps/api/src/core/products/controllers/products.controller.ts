import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FindManyProductsUseCase } from '../use-cases/find-many-products.usecase';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductUsecase } from '../use-cases/create-product.usecase';
import { FindOneProductUseCase } from '../use-cases/find-one-product.usecase';
import { UpdateProductUseCase } from '../use-cases/update-product.usecase';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { DeleteProductUseCase } from '../use-cases/delete-product.usecase';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { PaginationParamsDto } from '@/core/shared/dtos/paginations-params.dto';
import { HTTPResponse } from '@/core/shared/http/response';
import { safeAction } from '@/core/shared/http/safe-action';
import { GetBusiness } from '@/core/businesses/decorators/get-business.decorator';

@Controller('business/:businessSlug/products')
export class ProductsController {
  constructor(
    private readonly findManyProductsUseCase: FindManyProductsUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly createProductUseCase: CreateProductUsecase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get()
  @Permissions('products:read')
  public async findMany(
    @GetBusiness('id') businessId: string,
    @Query() pagination: PaginationParamsDto,
  ) {
    const products = await safeAction(
      () =>
        this.findManyProductsUseCase.execute(businessId, {
          limit: pagination.limit ?? 10,
          page: pagination.page ?? 0,
        }),
      'Algo salió mal al buscar los productos',
    );

    return HTTPResponse.ok(products);
  }

  @Post()
  @Permissions('products:create')
  public async create(
    @GetBusiness('id') businessId: string,
    @Body() data: CreateProductDto,
  ) {
    await safeAction(
      () => this.createProductUseCase.execute(businessId, data),
      'Algo salió mal al crear el producto',
    );

    return HTTPResponse.created(null);
  }

  @Get(':productId')
  @Permissions('products:read')
  public async findOne(
    @GetBusiness('id') businessId: string,
    @Param('productId') productId: string,
  ) {
    const product = await safeAction(
      () => this.findOneProductUseCase.execute(businessId, productId),
      'Algo salió mal al buscar el producto',
    );

    return HTTPResponse.ok(product);
  }

  @Patch(':productId')
  @Permissions('products:update')
  public async update(
    @GetBusiness('id') businessId: string,
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
  ) {
    await safeAction(
      () => this.updateProductUseCase.execute(businessId, productId, data),
      'Algo salió mal al actualizar el producto',
    );

    return HTTPResponse.ok(null);
  }
  @Delete(':productId')
  @Permissions('products:delete')
  public async delete(
    @GetBusiness('id') businessId: string,
    @Param('productId') productId: string,
  ) {
    await safeAction(
      () => this.deleteProductUseCase.execute(businessId, productId),
      'Algo salió mal al eliminar el producto',
    );

    return HTTPResponse.ok(null);
  }
}
