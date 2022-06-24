import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./roles.model";

@Table({tableName: 'roles_permissions', createdAt:false})
export class RolePermission extends Model<RolePermission> {

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    permissionId: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

}