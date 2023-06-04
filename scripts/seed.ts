import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SeedService } from '../src/seed/seed.service';
import { Logger } from "@nestjs/common";

const logger = new Logger('Seed');
async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    const seedService = app.get(SeedService);

    await seedService.perform();
    await app.close();

}

bootstrap()
    .then(() => {})
    .catch((err) => {

        logger.error(`Error occurred during seed completion: [${err}]`);
    
    });