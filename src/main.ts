require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule, {cors: env === "dev"});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
   }));
  await app.listen(3000);
}

//TODO read congif module of nest.js
bootstrap();