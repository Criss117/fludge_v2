import { Module } from '@nestjs/common';
import { UsersCommandsRepository } from './repositories/users-commands.repository';
import { UsersQueriesRepository } from './repositories/users-queries.repository';
import { CreateRootUserUseCase } from './use-cases/create-root-user.usecase';
import { CreateEmployeeUserUseCase } from './use-cases/create-employee-user.usecase';
import { FindOneEmployeeUseCase } from './use-cases/find-one-employee.usecase';
import { FindOneUserByUseCase } from './use-cases/find-one-user-by.usecase';

@Module({
  providers: [
    // use cases
    CreateRootUserUseCase,
    CreateEmployeeUserUseCase,
    FindOneEmployeeUseCase,
    FindOneUserByUseCase,

    // repositories
    UsersCommandsRepository,
    UsersQueriesRepository,
  ],
})
export class UsersModule {}
