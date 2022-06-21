import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/users-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

}