import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from "process";

const logger = new Logger('Main'); 

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    await app.listen(process.env.PORT);

}
bootstrap()
    .then(() => {

        logger.log(`Server is running on port: [${process.env.PORT}]`);
    
    })
    .catch((err) => {

        logger.log(`Error is occurred during initialization the server: [${err}]`);
    
    });
