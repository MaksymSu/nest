import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./roles.model";
import {User} from "../users/users.model";

@Table({tableName: 'users_roles', createdAt: false})
export class UserRole extends Model<UserRole> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}