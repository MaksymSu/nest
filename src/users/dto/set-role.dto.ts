import {User} from "../users.model";

export class SetRoleDto {
    readonly userId: number;
    readonly roleName: string;
}