import { Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
import { BookingService } from "../service/booking.service";
import { BookingDto } from "../dto/booking.dto";
import { Response } from "express";

@Controller('api')
export class BookingController {

    constructor(private readonly bookingService: BookingService) {}

    @Post('/rooms/:id/book')
    async bookRoom(@Param('id', ParseIntPipe) id: number, @Body() dto: BookingDto, @Res() res: Response) {

        const response = await this.bookingService.bookRoom(dto, id);

        if(response.status === HttpStatus.CREATED) {

            res.status(response.status).json({ 'message': response.message });
            return;
        
        }

        res.status(response.status).json({ 'error': response.message });
    
    }

}