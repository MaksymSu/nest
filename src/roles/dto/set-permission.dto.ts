import {ApiProperty} from "@nestjs/swagger";

export class SetPermissionDto {
    @ApiProperty({example: 'hrManager', description: 'Role name'})
    readonly parentName: string;

    @ApiProperty({example: 'assignRole', description: 'Permission name'})
    readonly childName: string;
}