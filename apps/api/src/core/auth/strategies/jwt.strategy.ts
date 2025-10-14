import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../dtos/jwt-payload.dto';
import { UserDetail } from '@fludge/entities/user.entity';
import { UserNotFoundException } from '@/core/users/exceptions/user-not-found.exception';
import { FindOneUserByUseCase } from '@/core/users/use-cases/find-one-user-by.usecase';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly findOneUserByUseCase: FindOneUserByUseCase,
  ) {
    const secret = configService.getOrThrow('JWT_SECRET');

    super({
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JWTPayload): Promise<UserDetail> {
    const user = await this.findOneUserByUseCase.execute(
      {
        id: payload.id,
      },
      {
        ensureActive: true,
      },
    );

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
