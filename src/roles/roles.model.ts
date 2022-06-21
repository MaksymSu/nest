import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UserRole} from "./users-roles.model";
import {User} from "../users/users.model";

interface RoleCreationAttrs {
    name: string;
    type: number;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    type: number;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}