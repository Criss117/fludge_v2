import { Module } from '@nestjs/common';
import { UsersCommandsRepository } from './repositories/users-commands.repository';
import { UsersQueriesRepository } from './repositories/users-queries.repository';
import { CreateRootUserUseCase } from './use-cases/create-root-user.usecase';
import { CreateEmployeeUserUseCase } from './use-cases/create-employee-user.usecase';
import { FindOneUserUseCase } from './use-cases/find-one-user.usecase';
import { DbModule } from '../db/db.module';
import { UpdateEmployeeUserUseCase } from './use-cases/update-employee-user.usecase';
import { FindOneUserByUseCase } from './use-cases/find-one-user-by.usecase';

@Module({
  imports: [DbModule],
  providers: [
    // use cases
    CreateRootUserUseCase,
    CreateEmployeeUserUseCase,
    FindOneUserUseCase,
    UpdateEmployeeUserUseCase,
    FindOneUserByUseCase,

    // repositories
    UsersCommandsRepository,
    UsersQueriesRepository,
  ],
  exports: [
    FindOneUserUseCase,
    FindOneUserByUseCase,
    CreateRootUserUseCase,
    CreateEmployeeUserUseCase,
    UpdateEmployeeUserUseCase,
  ],
})
export class UsersModule {}
