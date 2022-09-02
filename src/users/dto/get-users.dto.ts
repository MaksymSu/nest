import {ApiProperty} from "@nestjs/swagger";

export class GetUsersDto {

    @ApiProperty({example: 'admin', description: 'Filter', required: false})
    readonly filter: string;

    @ApiProperty({example: 'asc', description: 'Sort order', required: false})
    readonly order: string;

    @ApiProperty({example: 2, description: 'get from 2 record', required: false})
    readonly offset: number;

    @ApiProperty({example: 3, description: 'get 3 records', required: false})
    readonly n: number;
}