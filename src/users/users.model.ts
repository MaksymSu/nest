import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/users-roles.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'email@aol.com', description: 'email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'Jimm Morrison', description: 'Full name'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: '[{ "id": 12, "name": "admin", "description": "main admin", "type": 1}]', description: 'roles'})
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

}