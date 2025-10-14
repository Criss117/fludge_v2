import { Injectable } from '@nestjs/common';
import { UsersQueriesRepository } from '../repositories/users-queries.repository';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

type Options = {
  returnPassword?: boolean;
};

@Injectable()
export class FindOneUserByUseCase {
  constructor(
    private readonly usersQueriesRepository: UsersQueriesRepository,
  ) {}

  public async execute(userId: string, options?: Options) {
    const user = await this.usersQueriesRepository.findOne(userId, {
      ensureActive: true,
      returnPassword: options?.returnPassword,
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
