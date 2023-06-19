import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Res
} from "@nestjs/common";
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

    @Get('/rooms/:id/availability')
    async roomAvailability(@Param('id', ParseIntPipe) id: number, @Res() res: Response, @Query('date', new DefaultValuePipe(new Date().toISOString())) date: string) {

        const response = await this.bookingService.roomAvailability(id, new Date(date));
        if(response.status === HttpStatus.OK) {

            res.status(response.status).json(response.data);
        
        } else {

            res.status(response.status).json({ 'error': response.message });
        
        }
    
    }

}