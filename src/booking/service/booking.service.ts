import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingRepository } from "../repository/booking.repository";
import { BaseResponse } from "@utils/base.response";
import { BookingEntity } from "../entities/booking.entity";
import { ServiceExceptions } from "@utils/exceptions/service.expection";
import { BookingDto } from "../dto/booking.dto";
import { RoomAvailability } from "@utils/types";

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(BookingRepository)
        private readonly bookingRepository: BookingRepository
    ) {}

    async bookRoom(dto: BookingDto, roomId: number): Promise<BaseResponse<BookingEntity>> {

        try {

            return await this.bookingRepository.bookRoom(dto, roomId);
        
        } catch (err) {

            return ServiceExceptions.handle(err, BookingService.name, 'bookRoom');
        
        }
    
    }

    async roomAvailability(roomId: number, date: Date): Promise<BaseResponse<RoomAvailability | RoomAvailability[]>> {

        try {

            return await this.bookingRepository.roomAvailability(roomId, date);
        
        } catch (err) {

            return ServiceExceptions.handle(err, BookingService.name, 'roomAvailability');
        
        }
    
    }

}