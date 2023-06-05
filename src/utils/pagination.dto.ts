import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationDto {

    @IsOptional()
    @Transform((data) => {

        try {

            return +data.value;
        
        } catch (err) {

            return data.value;
        
        }
    
    })
    @IsNumber()
        page?: number = 1;

    @IsOptional()
    @Transform((data) => {

        try {

            return +data.value;

        } catch (err) {

            return data.value;

        }

    })
    @IsNumber()
        page_size? :number = 10;

}