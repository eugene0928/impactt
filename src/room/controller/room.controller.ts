import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Res,
    UseGuards
} from "@nestjs/common";
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
    async createRoom(@Body() dto: NewRoomDto, @Res() response: Response) {

        const res = await this.roomService.createRoom(dto);

        if(res.status == HttpStatus.CREATED) {

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

    @Get('/rooms/:id')
    async getRoomById(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.roomService.getRoomById(id);
        if(res.status === HttpStatus.NOT_FOUND) {

            response.status(HttpStatus.NOT_FOUND).json({ error: res.message });
            return;
        
        }

        response.status(res.status).json(res.data);
    
    }

    @UseGuards(JwtGuard)
    @Delete('/rooms/:id')
    async deleteRoom(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {

        const res = await this.roomService.deleteRoom(id);
        if(res.status === HttpStatus.NOT_FOUND) {

            response.status(HttpStatus.NOT_FOUND).json({ error: res.message });
            return;

        }

        response.status(res.status).json({ message: res.message });
    
    }

}