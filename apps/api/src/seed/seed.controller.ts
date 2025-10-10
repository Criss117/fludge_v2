import { Controller, Get, Logger } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigService } from '@nestjs/config';
import { HTTPResponse } from '../core/shared/logger/http/response';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly configService: ConfigService,
    private readonly seedService: SeedService,
    private readonly logger: Logger,
  ) {}

  @Get()
  public async seed() {
    const mode = this.configService.get('MODE', 'prod');

    if (mode.toLowerCase() !== 'dev') {
      return HTTPResponse.noContent();
    }

    try {
      await this.seedService.clearDB();
    } catch (error) {
      console.error(error);
    }

    const res = await this.seedService.seed();

    return HTTPResponse.ok(res);
  }

  @Get('clear')
  public async clear() {
    await this.seedService.clearDB();
  }
}
