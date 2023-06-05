import { Entity, Column } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';

@Entity('users')
export class UserEntity extends GeneralEntity {

    @Column({ type: 'varchar', name: 'name', nullable: false })
        name: string;

    @Column({ type: 'boolean', name: 'isAdmin', default: false })
        isAdmin: boolean; 

}
