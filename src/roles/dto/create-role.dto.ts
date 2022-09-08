import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 80, description: 'Role id'})
    readonly id: number;

    @ApiProperty({example: 'user', description: 'Role name'})
    readonly name: string;

    @ApiProperty({example: 1, description: '1 - role, 2 - permission (child role)'})
    readonly type: number;

    @ApiProperty({example: 'Simple user', description: 'Role description'})
    readonly description: string;
}
