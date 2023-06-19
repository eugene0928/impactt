import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";
import { NewRoomDto } from "../../src/room/dto/new.room.dto";
import { ROOM_TYPES } from "@utils/enums";
import { BookingDto } from "../../src/booking/dto/booking.dto";

export const bookingE2e = () => {

    describe('BookingModule (e2e)', () => {

        let app: INestApplication;
        let admin;
        let room;

        beforeAll(async () => {

            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();

        });

        afterAll(async () => {

            await request(app.getHttpServer())
                .delete(`/api/rooms/${room.body.id}`)
                .set({ Authorization: `Bearer ${admin.body.data}` })
                .expect(HttpStatus.OK);

            await app.close();

        });

        describe('bookRoom method', () => {

            beforeAll(async () => {

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

            it('bookRoom --> 400(POST)', () => {

                const dto: BookingDto = {
                    name: 'Testing',
                    start: new Date('06-19-2023 00:00:00'),
                    end: new Date('06-18-2023 10:00:00')
                };

                return request(app.getHttpServer())
                    .post(`/api/rooms/${room.body.id}/book`)
                    .send(dto)
                    .expect(HttpStatus.BAD_REQUEST);
            
            });

            it('bookRoom --> 201(POST)', () => {

                const dto: BookingDto = {
                    name: 'Testing',
                    start: new Date('06-19-2023 00:00:00'),
                    end: new Date('06-19-2023 10:00:00')
                };

                return request(app.getHttpServer())
                    .post(`/api/rooms/${room.body.id}/book`)
                    .send(dto)
                    .expect(HttpStatus.CREATED);

            });
        
        });

        it('/api/rooms/:id/availability --> 200(GET)', () => {

            return request(app.getHttpServer())
                .get(`/api/rooms/${room.body.id}/availability`)
                .expect(HttpStatus.OK);
        
        });

    });

};