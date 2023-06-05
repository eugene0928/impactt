import { ROOM_TYPES } from "@utils/enums";
import { IsEnum, IsNotEmpty } from "class-validator";

export class NewRoomDto {

    @IsNotEmpty()
        name: string;

    @IsNotEmpty()
    @IsEnum(ROOM_TYPES)
        type: ROOM_TYPES;

    @IsNotEmpty()
        capacity: number;

}