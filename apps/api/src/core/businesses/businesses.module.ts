import { Module } from '@nestjs/common';
import { BusinessesCommandsRepository } from './repositories/businesses-commands.repository';
import { BusinessesQueriesRepository } from './repositories/businesses-queries.repository';
import { CreateBusinessUseCase } from './use-cases/create-business.usecase';
import { FindOneBusinessUseCase } from './use-cases/find-one-business.usecase';
import { DbModule } from '../db/db.module';
import { BusinessesController } from './controllers/businesses.controller';
import { CreateGroupUseCase } from './use-cases/groups/create-group.usecase';
import { AssignEmployeesToGroupUseCase } from './use-cases/groups/assign-employees-to-group.usecase';
import { FindOneGroupUseCase } from './use-cases/groups/find-one-group.usecase';
import { UpdateGroupUseCase } from './use-cases/groups/update-group.usecase';
import { GroupsController } from './controllers/groups.controller';
import { EmployeesCommandsRepository } from './repositories/employees/employees-commands.repository';
import { EmployeesQueriesRepository } from './repositories/employees/employees-queries.repository';
import { GroupsQueriesRepository } from './repositories/groups/groups-queries.repository';
import { GroupsCommandsRepository } from './repositories/groups/groups-commands.repository';
import { EmployeesController } from './controllers/employees.controller';
import { CreateEmployeeUseCase } from './use-cases/employees/create-employee.usecase';
import { FindOneEmployeeUseCase } from './use-cases/employees/find-one-employee.usecase';
import { UsersModule } from '../users/users.module';
import { UpdateEmployeeUseCase } from './use-cases/employees/update-employee.usecase';
import { AssignGroupsToEmployeeUseCase } from './use-cases/employees/assign-groups-to-employee.usecase';
import { RemoveGroupsFromEmployeeUseCase } from './use-cases/employees/remove-groups-from-employee.usecase';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [BusinessesController, GroupsController, EmployeesController],
  providers: [
    // use cases
    CreateBusinessUseCase,
    FindOneBusinessUseCase,

    // groups use cases
    AssignEmployeesToGroupUseCase,
    CreateGroupUseCase,
    FindOneGroupUseCase,
    UpdateGroupUseCase,

    // employees use cases
    CreateEmployeeUseCase,
    FindOneEmployeeUseCase,
    UpdateEmployeeUseCase,
    AssignGroupsToEmployeeUseCase,
    RemoveGroupsFromEmployeeUseCase,

    // repositories
    BusinessesCommandsRepository,
    BusinessesQueriesRepository,

    // employees repositories
    EmployeesCommandsRepository,
    EmployeesQueriesRepository,

    // groups repositories
    GroupsCommandsRepository,
    GroupsQueriesRepository,
  ],
  exports: [FindOneBusinessUseCase],
})
export class BusinessesModule {}
