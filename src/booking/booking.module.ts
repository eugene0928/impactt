import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "@dec/typeorm-ex.module";
import { BookingRepository } from "./repository/booking.repository";
import { BookingController } from "./controller/booking.controller";
import { BookingService } from "./service/booking.service";

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([BookingRepository])
    ],
    controllers: [BookingController],
    providers: [BookingService]
})
export class BookingModule {}