import {forwardRef, Module} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {User} from "../users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {UserRole} from "./users-roles.model";
import {RolePermission} from "./roles-permissions.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRole, RolePermission]),
        forwardRef(() => UsersModule),
        RolesModule,
        AuthModule
    ],
    exports: [
        RolesService,
    ]
})
export class RolesModule {}
