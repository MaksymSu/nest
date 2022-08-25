import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";


export class JwtAuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}


    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.header.authorization;
            const authHeaderArr = authHeader.split(' ');

            if(authHeaderArr[0] !== 'Bearer' || !authHeader[1]) {
                throw new UnauthorizedException({'message' : 'Unauthorized user'})
            }

        } catch(e) {
            throw new UnauthorizedException({'message' : 'Unauthorized user'})
        }
    }
}