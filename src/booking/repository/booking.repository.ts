import { CustomRepository } from "@dec/typeorm-ex.decorator";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { BookingEntity } from "../entities/booking.entity";
import { BaseResponse } from "@utils/base.response";
import { DbExceptions } from "@utils/exceptions/dbException";
import { BookingDto } from "../dto/booking.dto";
import { dataSource } from "@utils/dataSource";
import { HttpStatus, Logger } from "@nestjs/common";
import { UserEntity } from "@user/entities/user.entity";
import { RoomAvailability } from "@utils/types";
import { RoomEntity } from "../../room/entities/room.entity";
import { formatDate } from "@utils/helper";
import { format } from 'date-fns';

@CustomRepository(BookingEntity)
export class BookingRepository extends Repository<BookingEntity> {

    #myLogger = new Logger(BookingRepository.name);
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
                name: dto.resident.name
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

    async roomAvailability(roomId: number, date: Date): Promise<BaseResponse<RoomAvailability | RoomAvailability[]>> {

        try {

            const freeSlots: RoomAvailability[] = [];
            let currentStartDate: Date = new Date(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} 00:00:00`);

            const roomEntity = await RoomEntity.findOneBy({ id: roomId });
            if(!roomEntity) {

                return { status: HttpStatus.NOT_FOUND, data: null, message: 'uzr, xona topilmadi' };
            
            }

            const bookedRoomEntities = await this.createQueryBuilder('booking')
                .where(`booking.roomId = :roomId`, { roomId })
                .andWhere(`date_trunc('second', booking.createdAt) :: Date = :date`, { date: format(date, 'yyyy-MM-dd') })
                .orderBy('booking.start')
                .getMany();

            if(!bookedRoomEntities.length) {

                const slot: RoomAvailability = {
                    start: formatDate(date),
                    end: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} 23:59:59`
                };

                return { status: HttpStatus.OK, data: [slot], message: 'OK' };
            
            }

            for(let i = 0; i < bookedRoomEntities.length; i++) {

                const slot = {
                    start: formatDate(currentStartDate),
                    end: formatDate(new Date(currentStartDate.getTime() + this.calculateDates(bookedRoomEntities[i].start, currentStartDate)))
                };

                freeSlots.push(slot);

                currentStartDate = bookedRoomEntities[i].end;
            
            }

            if(this.calculateDates(new Date(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} 23:59:59`), currentStartDate) > 0) {

                const slot = {
                    start: formatDate(currentStartDate),
                    end: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} 23:59:59`
                };

                freeSlots.push(slot);
            
            }

            return { status: HttpStatus.OK, data: freeSlots, message: 'OK' };
        
        }
        catch (err) {

            return DbExceptions.handle(err);
        
        }
    
    }

    /**
     *
     * @param date
     * @param currentDate
     * @return difference between dates in milliseconds
     */
    calculateDates(date: Date, currentDate: Date) {

        try {

            const currentDateInMilli = currentDate.getTime();
            const dateInMilli = date.getTime();

            return dateInMilli - currentDateInMilli;
        
        } catch (err) {

            this.#myLogger.error(`Error during calculation dates: [${err.message}]`);
        
        }
    
    }

}