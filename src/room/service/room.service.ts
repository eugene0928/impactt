import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from "../repository/room.repository";
import { NewRoomDto } from "../dto/new.room.dto";
import { RoomEntity } from "../entities/room.entity";
import { ServiceExceptions } from "@utils/exceptions/service.expection";
import { BaseResponse } from "@utils/base.response";
import { RoomQueryDto } from "../dto/room.query.dto";
import { RoomRes } from "@utils/types";

@Injectable()
export class RoomService {

    constructor(
        @InjectRepository(RoomRepository)
        private readonly roomRepository: RoomRepository
    ) {}

    async createRoom(dto: NewRoomDto): Promise<BaseResponse<RoomEntity>> {

        try {

            return await this.roomRepository.createRoom(dto);
        
        } catch (err) {

            return ServiceExceptions.handle(err, RoomService.name, 'createRoom');
        
        }
    
    }

    async getRooms(dto: RoomQueryDto): Promise<BaseResponse<RoomRes>> {

        try {

            return await this.roomRepository.getRooms(dto);
        
        } catch (err) {

            return ServiceExceptions.handle(err, RoomService.name, 'getRooms');
        
        }
    
    }

}