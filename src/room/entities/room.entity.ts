import { Column, Entity, OneToMany } from "typeorm";
import { GeneralEntity } from "@utils/base.entity";
import { ROOM_TYPES } from "@utils/enums";
import { BookingEntity } from "../../booking/entities/booking.entity";

@Entity('room')
export class RoomEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'name', unique: true, nullable: false })
        name: string;

    @Column({ type: 'enum', name: 'type', enum: ROOM_TYPES, nullable: false, default: ROOM_TYPES.TEAM })
        type: ROOM_TYPES;

    @Column({ type: "int", name: 'capacity', nullable: false })
        capacity: number;

    @OneToMany(() => BookingEntity, (booking) => booking.room)
        bookings: BookingEntity[];

}