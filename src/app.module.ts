import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as process from 'process';
import { TypeOrmModule } from "@nestjs/typeorm";
import { configuration } from "@utils/config";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";
import { RoomModule } from "./room/room.module";
import { BookingModule } from "./booking/booking.module";
import { DataSource } from "typeorm";
import { dataSource } from "@utils/dataSource";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env')
        }),
        TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
        SeedModule,
        AuthModule,
        RoomModule,
        BookingModule
    ],
    controllers: [],
    providers: [
        {
            provide: DataSource,
            useFactory: async () => {

                const logger = new Logger('DataSource');
                try {

                    await dataSource.initialize();
                    logger.log('Data Source has been initialized');
                    return dataSource;
                
                } catch (e) {

                    logger.error('Error during Data Source initialization', e);
                
                }
            
            }
        }
    ]
})
export class AppModule {}
