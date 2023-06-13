import { Column, Entity, ManyToOne } from "typeorm";
import { GeneralEntity } from "@utils/base.entity";
import { UserEntity } from "@user/entities/user.entity";
import { RoomEntity } from "../../room/entities/room.entity";

@Entity('booking')
export class BookingEntity extends GeneralEntity {

    @Column({ type: 'timestamp', name: 'start', nullable: false })
        start: Date;

    @Column({ type: 'timestamp', name: 'end', nullable: false })
        end: Date;

    @ManyToOne(() => UserEntity, (user) => user.bookings)
        user: UserEntity;

    @ManyToOne(() => RoomEntity, (room) => room.bookings)
        room: RoomEntity;

}