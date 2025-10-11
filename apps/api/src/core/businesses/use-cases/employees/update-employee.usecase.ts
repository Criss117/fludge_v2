import { UpdateEmployeeDto } from '@/core/users/dtos/update-employee.dto';
import { Injectable } from '@nestjs/common';
import { EmployeesQueriesRepository } from '@/core/businesses/repositories/employees/employees-queries.repository';
import { EmployeeNotFoundException } from '@/core/businesses/exceptions/employee-not-found.exception';
import { UpdateEmployeeUserUseCase } from '@/core/users/use-cases/update-employee-user.usecase';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    private readonly employeesQueriesRepository: EmployeesQueriesRepository,
    private readonly updateEmployeeUserUseCase: UpdateEmployeeUserUseCase,
  ) {}

  public async execute(
    businessId: string,
    employeeId: string,
    data: UpdateEmployeeDto,
  ) {
    const [exisitingEmployee] =
      await this.employeesQueriesRepository.findManyBy({
        businessId,
        userId: [employeeId],
      });

    if (!exisitingEmployee) throw new EmployeeNotFoundException();

    await this.updateEmployeeUserUseCase.execute(employeeId, data);
  }
}
