import {User} from "../users.model";
import {ApiProperty} from "@nestjs/swagger";

export class SetRoleDto {
    @ApiProperty({example: '1346', description: 'User id'})
    readonly userId: number;

    @ApiProperty({example: 'user', description: 'Role'})
    readonly roleName: string;
}