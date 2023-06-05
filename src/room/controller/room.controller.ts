import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { RoomService } from "../service/room.service";
import { NewRoomDto } from "../dto/new.room.dto";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RoomQueryDto } from "../dto/room.query.dto";

@Controller()
export class RoomController {

    constructor(private readonly roomService: RoomService) {}

    @UseGuards(JwtGuard)
    @Post('/rooms')
    async login(@Body() dto: NewRoomDto, @Res() response: Response) {

        const res = await this.roomService.createRoom(dto);

        if(res.status == 201) {

            response.status(res.status).json(res.data);
        
        } else {

            response.status(res.status).json({ error: "Xona yaratishda muammo yuz berdi!" });
        
        }

    }

    @Get('/rooms')
    async getRooms(@Query() dto: RoomQueryDto, @Res() response: Response) {

        const res = await this.roomService.getRooms(dto);
        response.status(res.status).json(res.data);
    
    }

}