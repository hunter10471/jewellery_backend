import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const PORT: number = config.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(PORT, () => {
    Logger.log(`App running on port ${PORT}`);
  });
}
bootstrap();
