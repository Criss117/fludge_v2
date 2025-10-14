import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersQueriesRepository } from '../repositories/users-queries.repository';
import { UsersCommandsRepository } from '../repositories/users-commands.repository';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UpdateEmployeeUserUseCase {
  constructor(
    private readonly usersQueriesRepository: UsersQueriesRepository,
    private readonly usersCommandsRepository: UsersCommandsRepository,
  ) {}

  public async execute(userId: string, data: UpdateEmployeeDto) {
    const existingUser = await this.usersQueriesRepository.findOneBy(
      {
        id: userId,
      },
      {
        ensureActive: true,
        returnPassword: true,
      },
    );

    if (!existingUser) throw new UserNotFoundException();
    if (!existingUser.password)
      throw new InternalServerErrorException("Password can't be empty");

    if (data.username && data.username !== existingUser.username) {
      const existingUsers = await this.usersQueriesRepository.findManyBy({
        username: data.username,
      });

      if (existingUsers.length > 0) {
        throw new UserAlreadyExistsException(
          'El nombre de usuario ya esta en uso',
        );
      }
    }

    await this.usersCommandsRepository.save({
      id: userId,
      isRoot: false,
      firstName: data.firstName ?? existingUser.firstName,
      lastName: data.lastName ?? existingUser.lastName,
      username: data.username ?? existingUser.username,
      password: data.password ?? existingUser.password,
    });
  }
}
