import {ApiProperty} from "@nestjs/swagger";

export class ReplaceRolesDto {

    @ApiProperty({example: 'hrManager', description: 'From role name'})
    readonly from: string;

    @ApiProperty({example: 'banned', description: 'To role name'})
    readonly to: string;
}