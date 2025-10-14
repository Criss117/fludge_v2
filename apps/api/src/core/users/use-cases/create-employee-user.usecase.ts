import { Injectable } from '@nestjs/common';
import { UsersQueriesRepository } from '../repositories/users-queries.repository';
import { UsersCommandsRepository } from '../repositories/users-commands.repository';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { TX } from '@/core/db/db.module';
import { hashPassword } from '@/core/shared/utils/passwords.utils';

type Options = {
  tx: TX;
};

@Injectable()
export class CreateEmployeeUserUseCase {
  constructor(
    private readonly usersQueriesRepository: UsersQueriesRepository,
    private readonly usersCommandsRepository: UsersCommandsRepository,
  ) {}

  public async execute(data: CreateEmployeeDto, options?: Options) {
    const existingUsers = await this.usersQueriesRepository.findOneBy(
      {
        username: data.username,
      },
      {
        ensureActive: true,
      },
    );

    if (existingUsers) throw new UserAlreadyExistsException();

    const hashedPassword = await hashPassword(data.password);

    const createdUser = await this.usersCommandsRepository.saveAndReturn(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashedPassword,
        isRoot: false,
      },
      options,
    );

    if (!createdUser) throw new Error('User not created');

    return createdUser;
  }
}
