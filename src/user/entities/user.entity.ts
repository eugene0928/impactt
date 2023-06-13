import { Entity, Column, OneToMany } from "typeorm";
import { GeneralEntity } from '@utils/base.entity';
import { BookingEntity } from "../../booking/entities/booking.entity";

@Entity('users')
export class UserEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'name', nullable: false })
        name: string;

    @Column({ type: 'boolean', name: 'isAdmin', default: false })
        isAdmin: boolean;

    @OneToMany(() => BookingEntity, (booking) => booking.user)
        bookings: BookingEntity[];

}
