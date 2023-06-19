import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";
import { NewRoomDto } from "../../src/room/dto/new.room.dto";
import { ROOM_TYPES } from "@utils/enums";

export const roomE2e = () => {

    describe('RoomModule (e2e)', () => {

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

        it('/api/rooms --> 200(GET)', () => {

            return request(app.getHttpServer())
                .get('/api/rooms?page=1&page_size=10')
                .expect(HttpStatus.OK);

        });

        it('/api/rooms/:id --> 404(GET)', async () => {

            const id = 999;

            return request(app.getHttpServer())
                .post(`/api/rooms/${id}`)
                .expect(HttpStatus.NOT_FOUND);
        
        });

        describe('room -> GET', () => {

            let admin;
            let room;

            beforeAll(async() => {

                admin = await request(app.getHttpServer())
                    .post('/api/login')
                    .send({ name: 'SuperAdmin' });

                const roomDto: NewRoomDto = {
                    name: 'testRoom' + Date.now(),
                    type: ROOM_TYPES.FOCUS,
                    capacity: 1
                };

                room = await request(app.getHttpServer())
                    .post('/api/rooms')
                    .set({ Authorization: `Bearer ${admin.body.data}` })
                    .send(roomDto)
                    .expect(HttpStatus.CREATED);

            });

            afterAll(async() => {

                return request(app.getHttpServer())
                    .delete(`/api/rooms/${room.body.id}`)
                    .set({ Authorization: `Bearer ${admin.body.data}` })
                    .expect(HttpStatus.OK);

            });

            it('/rooms/:id --> 200(GET)', async () => {

                return request(app.getHttpServer())
                    .get(`/api/rooms/${room.body.id}`)
                    .expect(HttpStatus.OK);

            });
        
        });

    });

};