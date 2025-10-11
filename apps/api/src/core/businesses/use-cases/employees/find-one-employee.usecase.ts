import { Injectable } from '@nestjs/common';
import { EmployeesQueriesRepository } from '@/core/businesses/repositories/employees/employees-queries.repository';

@Injectable()
export class FindOneEmployeeUseCase {
  constructor(
    private readonly employeesQueriesRepository: EmployeesQueriesRepository,
  ) {}

  public async execute(businessId: string, employeeId: string) {
    const employee = await this.employeesQueriesRepository.findOne(
      {
        businessId,
        userId: employeeId,
      },
      {
        ensureActive: true,
      },
    );

    if (!employee) throw new Error('Employee not found');

    return employee;
  }
}
