import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from '@utils/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration.port);
}
bootstrap()
  .then(() => {
    logger.log(`Server is running on port: [${configuration.port}]`);
  })
  .catch((err) => {
    logger.log(`Error is occurred during initialization the server: [${err}]`);
  });
