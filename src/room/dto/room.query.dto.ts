import { ROOM_TYPES } from "@utils/enums";
import { PaginationDto } from "@utils/pagination.dto";
import { IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class RoomQueryDto extends PaginationDto {

    @IsOptional()
        search?: string;

    @IsOptional()
    @IsEnum(['focus', 'team', 'conference'], {
        message: 'Invalid type',
        each: true
    })
        type?: string;

}