import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from "./users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/users-roles.model";
import {RolesModule} from "../roles/roles.module";


@Module({
  controllers: [UsersController],
  providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole]),
        RolesModule,
    ],
    exports: [
        UsersService,
    ]
})

export class UsersModule {}
