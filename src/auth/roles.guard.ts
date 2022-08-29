import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private jwtService: JwtService, private reflector: Reflector) {}


    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            return req.user.roles.some(role => (requiredRoles.includes(role.name) || role.children.some(perm => requiredRoles.includes(perm.name))));

        } catch(e) {
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
        }
    }
}