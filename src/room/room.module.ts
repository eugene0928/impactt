import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { RoomController } from "./controller/room.controller";
import { RoomService } from "./service/room.service";
import { RoomRepository } from "./repository/room.repository";

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([RoomRepository]),
        JwtModule.register({})
    ],
    controllers: [RoomController],
    providers: [RoomService]
})
export class RoomModule {}