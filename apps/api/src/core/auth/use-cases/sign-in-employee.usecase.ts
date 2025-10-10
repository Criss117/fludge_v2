import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BadCredentialsException } from '../exceptions/unauthorized.exception';
import { SignInEmployeeDto } from '../dtos/sign-in.dto';
import { comparePasswords } from '@/core/shared/utils/passwords.utils';
import { FindOneUserByUseCase } from '@/core/users/use-cases/find-one-user-by.usecase';
import { UserNotFoundException } from '@/core/users/exceptions/user-not-found.exception';

@Injectable()
export class SignInEmployeeUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findOneUserByUseCase: FindOneUserByUseCase,
  ) {}

  public async execute(meta: SignInEmployeeDto) {
    const user = await this.findOneUserByUseCase.execute(
      {
        username: meta.username,
      },
      {
        returnPassword: true,
      },
    );

    if (!user || !user.password) {
      throw new UserNotFoundException();
    }

    const resultOfComparison = await comparePasswords(
      meta.password,
      user.password,
    );

    if (!resultOfComparison) {
      throw new BadCredentialsException();
    }

    const jwt = this.jwtService.sign({
      id: user.id,
    });

    return jwt;
  }
}
