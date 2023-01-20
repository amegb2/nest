import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({
        description:"Please provide a date in ISO format. E.g 2023-01-20 or 2023-01-20T06:30:57.129Z"
    })
    from: string; 
    @ApiProperty({
        description:"Please provide a date in ISO format. E.g 2023-01-20 or 2023-01-20T06:30:57.129Z"
    })
    to: string; 
}