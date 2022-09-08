import {ApiProperty} from "@nestjs/swagger";

export class SetPermissionsDtoByIds {

    @ApiProperty({example: 85, description: 'Role id'})
    readonly parentId: number;

    @ApiProperty({example: [93, 84], description: 'Permissions ids'})
    readonly childrenIds: number [];
}