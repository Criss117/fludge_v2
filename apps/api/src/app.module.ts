import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './core/shared/logger/logger.module';
import { DbModule } from './core/db/db.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './core/users/users.module';
import { BusinessesModule } from './core/businesses/businesses.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    DbModule,
    SeedModule,
    UsersModule,
    BusinessesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
