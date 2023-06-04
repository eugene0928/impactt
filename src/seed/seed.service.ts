import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '@user/entities/user.entity';
import { SUPER_ADMIN } from '@utils/constants';

@Injectable()
export class SeedService {

    #logger = new Logger(SeedService.name);

    constructor(private readonly entityManager: EntityManager) {}

    async perform(): Promise<void> {

        await this.entityManager.transaction(async (manager) => {

            await this.createSuperAdminUser(manager);
            this.#logger.log('Seed data complete.');
        
        });
    
    }

    async createSuperAdminUser(manager: EntityManager): Promise<void> {

        const users = await manager.find(UserEntity);

        if (users.length > 0) {

            this.#logger.log('SuperAdmin user exists. Skipping seed...'); 
        
        } else {

            const user = new UserEntity();
            user.name = SUPER_ADMIN;
            user.isAdmin = true;

            const superAdminUser = manager.create(UserEntity, user);
            await manager.save(superAdminUser);
        
        }
    
    }

}
