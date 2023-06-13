import { IsDate, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class BookingDto {

    @IsNotEmpty()
        name: string;

    @IsNotEmpty()
    @Transform(data => {

        try {

            const [datePart, timePart] = data.value.split(' ');

            const [day, month, year] = datePart.split('-').map(Number);
            const [hours, minutes, seconds] = timePart.split(':').map(Number);

            return new Date(year, month - 1, day, hours, minutes, seconds);

        } catch (err) {

            return data.value;
        
        }
    
    })
    @IsDate()
        start: Date;

    @IsNotEmpty()
    @Transform(data => {

        try {

            const [datePart, timePart] = data.value.split(' ');

            const [day, month, year] = datePart.split('-').map(Number);
            const [hours, minutes, seconds] = timePart.split(':').map(Number);

            return new Date(year, month - 1, day, hours, minutes, seconds);

        } catch (err) {

            return data.value;

        }

    })
    @IsDate()
        end: Date;

}