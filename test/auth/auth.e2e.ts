import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";
import { LoginDto } from "../../src/auth/dto/login.dto";

export const authTests = () => {

    describe('AuthModule (e2e)', () => {

        let app: INestApplication;

        beforeAll(async () => {

            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();

        });

        afterAll(async () => {

            await app.close();
        
        });

        it('/login --> 200(POST)', () => {

            const admin: LoginDto = { name: 'SuperAdmin' };

            return request(app.getHttpServer())
                .post('/api/login')
                .send(admin)
                .expect(200)
                .expect(({ body }) => {

                    expect(body).toEqual({ status: HttpStatus.OK, message: expect.any(String), data: expect.any(String) });
                
                });

        });

        it('/login --> 404(POST)', async () => {

            const admin: LoginDto = { name: 'Admin' };

            return request(app.getHttpServer())
                .post('/api/login')
                .send(admin)
                .expect(404)
                .expect(({ body }) => {

                    expect(body).toEqual({ status: HttpStatus.NOT_FOUND, message: 'User is not found', data: null });

                });

        });

    });

};
