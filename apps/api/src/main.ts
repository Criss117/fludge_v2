import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 8081);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Fludge API')
    .setDescription('The Fludge API description')
    .setVersion('1.0')
    .addTag('fludge')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(PORT);

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${PORT} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
