import { Injectable } from '@nestjs/common';
import { AssignEmployeesToGroupDto } from '@/core/businesses/dtos/groups/assign-employees-to-group.dto';
import { EmployeesQueriesRepository } from '@/core/businesses/repositories/employees/employees-queries.repository';
import { EmployeeNotFoundException } from '@/core/businesses/exceptions/employee-not-found.exception';
import { EmployeesCommandsRepository } from '@/core/businesses/repositories/employees/employees-commands.repository';
import { GroupsQueriesRepository } from '@/core/businesses/repositories/groups/groups-queries.repository';
import { GroupNotFoundException } from '@/core/businesses/exceptions/group-not-found.exception';

@Injectable()
export class RemoveEmployeesFromGroupUseCase {
  constructor(
    private readonly employeesQueriesRepository: EmployeesQueriesRepository,
    private readonly employeesCommandsRepository: EmployeesCommandsRepository,
    private readonly groupsQueriesRepository: GroupsQueriesRepository,
  ) {}

  //TODO: validate if the group exists
  public async execute(
    businessId: string,
    groupSlug: string,
    data: AssignEmployeesToGroupDto,
  ) {
    const [group] = await this.groupsQueriesRepository.findManyBy(
      {
        businessId,
        slugs: [groupSlug],
      },
      {
        ensureActive: true,
      },
    );

    if (!group) throw new GroupNotFoundException();

    const existingEmployees = await this.employeesQueriesRepository.findManyBy(
      {
        businessId,
        userId: data.employeeIds,
      },
      {
        ensureActive: true,
      },
    );

    if (existingEmployees.length !== data.employeeIds.length)
      throw new EmployeeNotFoundException();

    const employeesToUpdate = existingEmployees.map((employee) => ({
      businessId,
      userId: employee.userId,
      groupIds: employee.groupIds.filter((id) => id !== group.id),
    }));

    const updateEmployeesPromises = employeesToUpdate.map((employee) => {
      return this.employeesCommandsRepository.save(employee);
    });

    await Promise.all(updateEmployeesPromises);
  }
}
