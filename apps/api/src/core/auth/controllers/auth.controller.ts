import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Post,
} from '@nestjs/common';
import { CreateRootUserDto } from 'src/core/users/dtos/create-root-user.dto';
import { SignInDto, SignInEmployeeDto } from '../dtos/sign-in.dto';
import { SignInRootUserUseCase } from '../use-cases/sign-in-root-user.usecase';
import { SignUpRootUserUseCase } from '../use-cases/sign-up-root-user.usecase';
import { GetUser } from '../decorators/get-user.decorator';
import { Public } from '../decorators/public-route.decorator';
import { SignInEmployeeUseCase } from '../use-cases/sign-in-employee.usecase';
import { HTTPResponse } from '@/core/shared/http/response';
import { allPermissions } from '@fludge/entities/permissions.entity';
import type { UserDetail } from '@fludge/entities/user.entity';
import { safeAction } from '@/core/shared/http/safe-action';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpRootUserUseCase: SignUpRootUserUseCase,
    private readonly signInRootUserUseCase: SignInRootUserUseCase,
    private readonly signInEmployeeUseCase: SignInEmployeeUseCase,
  ) {}

  @Post('sign-up')
  @Public()
  public async create(@Body() data: CreateRootUserDto) {
    try {
      await this.signUpRootUserUseCase.execute(data);

      return HTTPResponse.created(null);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException('Something went wrong');
    }
  }

  @Post('sign-in')
  @Public()
  public async signIn(@Body() data: SignInDto) {
    const jwt = await safeAction(
      () => this.signInRootUserUseCase.execute(data),
      'Algo salió mal al intentar iniciar sesión como root',
    );

    return HTTPResponse.ok(jwt);
  }

  @Post('sign-in-employee')
  @Public()
  public async signInEmployee(@Body() data: SignInEmployeeDto) {
    const jwt = await safeAction(
      () => this.signInEmployeeUseCase.execute(data),
      'Algo salió mal al intentar iniciar sesión como root',
    );

    return HTTPResponse.ok(jwt);
  }

  @Get('profile')
  public getUser(@GetUser() user: UserDetail) {
    return HTTPResponse.ok(user);
  }

  @Get('permissions')
  @Public()
  public findAllPermissions() {
    return HTTPResponse.ok(allPermissions);
  }
}
