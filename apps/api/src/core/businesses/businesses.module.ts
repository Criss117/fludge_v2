import { Module } from '@nestjs/common';
import { BusinessesCommandsRepository } from './repositories/businesses-commands.repository';
import { BusinessesQueriesRepository } from './repositories/businesses-queries.repository';
import { CreateBusinessUseCase } from './use-cases/create-business.usecase';
import { FindOneBusinessUseCase } from './use-cases/find-one-business.usecase';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [
    // use cases
    CreateBusinessUseCase,
    FindOneBusinessUseCase,

    // repositories
    BusinessesCommandsRepository,
    BusinessesQueriesRepository,
  ],
  exports: [FindOneBusinessUseCase],
})
export class BusinessesModule {}
