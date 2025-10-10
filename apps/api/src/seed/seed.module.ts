import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/core/shared/logger/logger.module';
import { DbModule } from '@/core/db/db.module';

@Module({
  imports: [DbModule, ConfigModule, LoggerModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
