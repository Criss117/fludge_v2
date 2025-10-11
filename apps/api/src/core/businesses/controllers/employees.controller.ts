import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetBusiness } from '../decorators/get-business.decorator';
import { CreateEmployeeUseCase } from '../use-cases/employees/create-employee.usecase';
import { CreateEmployeeDto } from '@/core/users/dtos/create-employee.dto';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { safeAction } from '@/core/shared/http/safe-action';
import { HTTPResponse } from '@/core/shared/http/response';
import { FindOneEmployeeUseCase } from '../use-cases/employees/find-one-employee.usecase';
import { UpdateEmployeeUseCase } from '../use-cases/employees/update-employee.usecase';
import { UpdateEmployeeDto } from '@/core/users/dtos/update-employee.dto';
import { AssignGroupsToEmployeeDto } from '../dtos/groups/assign-groups-to-employee.dto';
import { AssignGroupsToEmployeeUseCase } from '../use-cases/employees/assign-groups-to-employee.usecase';
import { RemoveGroupsFromEmployeeUseCase } from '../use-cases/employees/remove-groups-from-employee.usecase';

@Controller('businesses/:businessSlug/employees')
export class EmployeesController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly assignGroupsToEmployee: AssignGroupsToEmployeeUseCase,
    private readonly removeGroupsFromEmployeeUseCase: RemoveGroupsFromEmployeeUseCase,
  ) {}

  @Post()
  @Permissions('users:create')
  public async createEmployee(
    @GetBusiness('id') businessId: string,
    @Body() data: CreateEmployeeDto,
  ) {
    await safeAction(
      () => this.createEmployeeUseCase.execute(businessId, data),
      'Algo salió mal en la creación del usuario',
    );

    return HTTPResponse.created(null);
  }

  @Get(':employeeId')
  @Permissions('users:read')
  public async findOneEmployee(
    @GetBusiness('id') businessId: string,
    @Param('employeeId') employeeId: string,
  ) {
    const employee = await safeAction(
      () => this.findOneEmployeeUseCase.execute(businessId, employeeId),
      'Algo salió mal en la búsqueda del usuario',
    );

    return HTTPResponse.ok(employee);
  }

  @Patch(':employeeId')
  @Permissions('users:read')
  public async updateEmployee(
    @GetBusiness('id') businessId: string,
    @Param('employeeId') employeeId: string,
    @Body() data: UpdateEmployeeDto,
  ) {
    await safeAction(
      () => this.updateEmployeeUseCase.execute(businessId, employeeId, data),
      'Algo salió mal en la actualización del usuario',
    );

    return HTTPResponse.ok(null);
  }

  @Patch(':employeeId/groups')
  @Permissions('users:update')
  public async assingGroups(
    @GetBusiness('id') businessId: string,
    @Param('employeeId') employeeId: string,
    @Body() data: AssignGroupsToEmployeeDto,
  ) {
    await safeAction(
      () => this.assignGroupsToEmployee.execute(businessId, employeeId, data),
      'Algo salió mal al asignar grupos al empleado',
    );

    return HTTPResponse.ok(null);
  }

  @Delete(':employeeId/groups')
  @Permissions('users:update')
  public async removeGroups(
    @GetBusiness('id') businessId: string,
    @Param('employeeId') employeeId: string,
    @Body() data: AssignGroupsToEmployeeDto,
  ) {
    await safeAction(
      () =>
        this.removeGroupsFromEmployeeUseCase.execute(
          businessId,
          employeeId,
          data,
        ),
      'Algo salió mal al eliminar grupos del empleado',
    );

    return HTTPResponse.ok(null);
  }
}
