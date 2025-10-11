import { Inject, Injectable } from '@nestjs/common';
import { DBSERVICE, type LibSQLDatabase } from '@/core/db/db.module';
import { CreateEmployeeDto } from '@/core/users/dtos/create-employee.dto';
import { CreateEmployeeUserUseCase } from '@/core/users/use-cases/create-employee-user.usecase';
import { EmployeesCommandsRepository } from '@/core/businesses/repositories/employees/employees-commands.repository';
import { GroupsQueriesRepository } from '@/core/businesses/repositories/groups/groups-queries.repository';
import { GroupNotFoundException } from '@/core/businesses/exceptions/group-not-found.exception';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject(DBSERVICE) private readonly db: LibSQLDatabase,
    private readonly createEmployeeUserUseCase: CreateEmployeeUserUseCase,
    private readonly employeesCommandsRepository: EmployeesCommandsRepository,
    private readonly groupsQueriesRepository: GroupsQueriesRepository,
  ) {}

  public async execute(businessId: string, data: CreateEmployeeDto) {
    const existingGroups = await this.groupsQueriesRepository.findManyBy(
      {
        businessId,
        ids: data.groupIds,
      },
      {
        ensureActive: true,
      },
    );

    if (existingGroups.length !== data.groupIds.length)
      throw new GroupNotFoundException(
        'Uno o más grupos no fueron encontrados o no pertenecen al negocio',
      );

    await this.db.transaction(async (tx) => {
      const createdEmployee = await this.createEmployeeUserUseCase.execute(
        data,
        {
          tx,
        },
      );

      await this.employeesCommandsRepository.save(
        {
          businessId,
          userId: createdEmployee.id,
          groupIds: data.groupIds,
        },
        {
          tx,
        },
      );
    });
  }
}
