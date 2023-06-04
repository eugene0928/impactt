import { Column, Entity } from "typeorm";
import { GeneralEntity } from "@utils/base.entity";
import { ROOM_TYPES } from "@utils/enums";

@Entity('room')
export class RoomEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'name', unique: true, nullable: false })
        name: string;

    @Column({ type: 'enum', name: 'type', enum: ROOM_TYPES, nullable: false, default: ROOM_TYPES.TEAM })
        type: ROOM_TYPES;

}