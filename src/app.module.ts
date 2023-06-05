import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as process from 'process';
import { TypeOrmModule } from "@nestjs/typeorm";
import { configuration } from "@utils/config";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { RoomModule } from "./room/room.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env')
        }),
        TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
        SeedModule,
        AuthModule,
        RoomModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
