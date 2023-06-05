import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@dec/typeorm-ex.decorator';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async getUserByName(name: string): Promise<UserEntity> {

        return await UserEntity.findOne({
            where: {
                name
            }
        });
    
    }

}