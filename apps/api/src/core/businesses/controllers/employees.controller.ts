import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { GetBusiness } from '../decorators/get-business.decorator';
import { CreateEmployeeUseCase } from '../use-cases/employees/create-employee.usecase';
import { CreateEmployeeDto } from '@/core/users/dtos/create-employee.dto';
import { Permissions } from '@/core/auth/decorators/permissions.decorator';
import { safeAction } from '@/core/shared/http/safe-action';
import { HTTPResponse } from '@/core/shared/http/response';
import { FindOneEmployeeUseCase } from '../use-cases/employees/find-one-employee.usecase';

@Controller('businesses/:businessSlug/employees')
export class EmployeesController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
    // private readonly assignGroupsToEmployee: AssignGroupsToEmployeeUseCase,
    // private readonly removeGroupsFromEmployee: RemoveGroupsFromEmployeeUseCase,
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

  // @Post(':employeeId/groups')
  // @Permissions('users:update')
  // public async assingGroups(
  //   @GetBusiness('id') businessId: string,
  //   @Param('employeeId') employeeId: string,
  //   @Body() data: AssignGroupsToEmployeeDto,
  // ) {
  //   try {
  //     await this.assignGroupsToEmployee.execute(businessId, employeeId, data);

  //     return HTTPResponse.ok(null);
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }

  // @Delete(':employeeId/groups')
  // @Permissions('users:update')
  // public async removeGroups(
  //   @GetBusiness('id') businessId: string,
  //   @Param('employeeId') employeeId: string,
  //   @Body() data: AssignGroupsToEmployeeDto,
  // ) {
  //   try {
  //     await this.removeGroupsFromEmployee.execute(businessId, employeeId, data);

  //     return HTTPResponse.ok(null);
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }
}
