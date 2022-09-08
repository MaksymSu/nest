import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UserRole} from "./users-roles.model";
import {User} from "../users/users.model";
import {RolePermission} from "./roles-permissions.model";
import {ApiProperty} from "@nestjs/swagger";

interface RoleCreationAttrs {
    name: string;
    type: number;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: 80, description: 'unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user', description: 'Role name'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({example: '1', description: 'Role type'})
    @Column({type: DataType.INTEGER, allowNull: false})
    type: number;

    @ApiProperty({example: 'Simple user', description: 'Role description'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];

    @ApiProperty({example: '[{ "id": 12, "name": "viewUsers", "description": "View users", "type": 2}]', description: 'permissions'})
    @BelongsToMany(() => Role, () => RolePermission, 'roleId')
    children: Role[];

   // @BelongsToMany(() => Role, () => RolePermission, 'permissionId')
   // permissions: Role[];


}