import { CustomRepository } from "@dec/typeorm-ex.decorator";
import { RoomEntity } from "../entities/room.entity";
import { Repository } from "typeorm";
import { DbExceptions } from "@utils/exceptions/dbException";
import { NewRoomDto } from "../dto/new.room.dto";
import { BaseResponse } from "@utils/base.response";
import { HttpStatus } from "@nestjs/common";
import { RoomQueryDto } from "../dto/room.query.dto";
import { Room, RoomRes } from "@utils/types";
import { ROOM_LABEL, ROOM_LABEL_REVERSE } from "@utils/labers";

@CustomRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {

    async createRoom(dto: NewRoomDto): Promise<BaseResponse<RoomEntity>> {

        try {

            const roomEntity = await this.create(dto).save();
            return { status: HttpStatus.CREATED, data: roomEntity, message: 'CREATED' };
            
        } catch (err) {

            return DbExceptions.handle(err);
        
        }
    
    }

    async getRooms(dto: RoomQueryDto): Promise<BaseResponse<RoomRes>> {

        try {

            const [roomEntities, total] = await this.findAndCount({
                where: {
                    type: ROOM_LABEL_REVERSE.get(dto.type),
                    name: dto.search
                },
                skip: (dto.page - 1) * dto.page_size,
                take: dto.page_size
            });

            const rooms: Room[] = [];

            for(const roomEntity of roomEntities) {

                const room: Room = {
                    id: roomEntity.id,
                    name: roomEntity.name,
                    type: ROOM_LABEL.get(roomEntity.type),
                    capacity: roomEntity.capacity
                };

                rooms.push(room);
            
            }

            const response: RoomRes = {
                page: dto.page,
                count: total,
                page_size: dto.page_size,
                results: rooms
            };

            return { status: HttpStatus.OK, data: response, message: 'OK' };
        
        } catch (err) {

            return DbExceptions.handle(err);
        
        }
    
    }

}