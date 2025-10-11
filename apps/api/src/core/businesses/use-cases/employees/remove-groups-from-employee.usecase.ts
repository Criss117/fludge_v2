import { Injectable } from '@nestjs/common';
import { EmployeesQueriesRepository } from '@/core/businesses/repositories/employees/employees-queries.repository';
import { EmployeesCommandsRepository } from '@/core/businesses/repositories/employees/employees-commands.repository';
import { GroupsQueriesRepository } from '@/core/businesses/repositories/groups/groups-queries.repository';
import { AssignGroupsToEmployeeDto } from '@/core/businesses/dtos/groups/assign-groups-to-employee.dto';
import { EmployeeNotFoundException } from '@/core/businesses/exceptions/employee-not-found.exception';

@Injectable()
export class RemoveGroupsFromEmployeeUseCase {
  constructor(
    private readonly employeesQueriesRepository: EmployeesQueriesRepository,
    private readonly employeesCommandsReposotory: EmployeesCommandsRepository,
    private readonly groupsQueriesRepository: GroupsQueriesRepository,
  ) {}

  public async execute(
    businessId: string,
    employeeId: string,
    data: AssignGroupsToEmployeeDto,
  ) {
    const groups = await this.groupsQueriesRepository.findManyBy({
      businessId,
      ids: data.groupIds,
    });

    if (!groups.length) throw new Error('No se encontraron grupos');

    const employeeInfo = await this.employeesQueriesRepository.findOne(
      {
        businessId,
        userId: employeeId,
      },
      {
        ensureActive: true,
      },
    );

    if (!employeeInfo) throw new EmployeeNotFoundException();

    const groupsIds = employeeInfo.groups
      .filter((g) => !data.groupIds.includes(g.id))
      .flatMap((g) => g.id);

    await this.employeesCommandsReposotory.save({
      businessId,
      userId: employeeId,
      groupIds: groupsIds,
    });
  }
}
