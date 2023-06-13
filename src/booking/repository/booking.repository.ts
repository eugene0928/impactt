import { CustomRepository } from "@dec/typeorm-ex.decorator";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { BookingEntity } from "../entities/booking.entity";
import { BaseResponse } from "@utils/base.response";
import { DbExceptions } from "@utils/exceptions/dbException";
import { BookingDto } from "../dto/booking.dto";
import { dataSource } from "@utils/dataSource";
import { HttpStatus } from "@nestjs/common";
import { UserEntity } from "@user/entities/user.entity";

@CustomRepository(BookingEntity)
export class BookingRepository extends Repository<BookingEntity> {
  
    async bookRoom(dto: BookingDto, roomId: number): Promise<BaseResponse<BookingEntity>> {

        const queryRunner = await dataSource.createQueryRunner();
        try {

            await queryRunner.connect();
            await queryRunner.startTransaction();

            if(dto.start >= dto.end) {

                return { status: HttpStatus.BAD_REQUEST, data: null, message: 'vaqt xato kiritildi' };
            
            }

            const bookedRoomEntity = await this.findOne({
                where: {
                    room: { id: roomId },
                    start: LessThanOrEqual(dto.end),
                    end: MoreThanOrEqual(dto.start)
                },
                relations: {
                    room: true
                }
            });

            if(bookedRoomEntity) {

                return { status: HttpStatus.GONE, data: null, message: 'uzr, siz tanlagan vaqtda xona band' };
            
            }

            const newUser = await UserEntity.create({
                name: dto.name
            }).save();

            const newBookingEntity = await this.create({
                room: { id: roomId },
                user: { id: newUser.id },
                start: dto.start,
                end: dto.end
            }).save();
            
            await queryRunner.commitTransaction();
            return { status: HttpStatus.CREATED, data: newBookingEntity, message: 'xona muvaffaqiyatli band qilindi' };
        
        } catch (err) {

            await queryRunner.rollbackTransaction();
            return DbExceptions.handle(err);
        
        } finally {

            await queryRunner.release();
        
        }
    
    }

}