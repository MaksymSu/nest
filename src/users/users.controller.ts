import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Controller, Get} from "@nestjs/common";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

}
