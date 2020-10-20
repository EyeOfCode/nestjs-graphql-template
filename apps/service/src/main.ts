import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService: ConfigService = app.get(ConfigService);
  // console.log('=>',configService)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
