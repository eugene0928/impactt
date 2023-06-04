import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { SeedModule } from './seed/seed.module';
// import { configuration } from '@utils/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as process from 'process';
import { TypeOrmModule } from "@nestjs/typeorm";
import { configuration } from "@utils/config";
import { SeedModule } from "./seed/seed.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env')
        }),
        TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
        SeedModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
