import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}


    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const authHeaderArr = authHeader.split(' ');

            if(authHeaderArr[0] !== 'Bearer' || !authHeader[1]) {
                throw new UnauthorizedException({'message' : 'Unauthorized user'})
            }

            const user = this.jwtService.verify(authHeaderArr[1]);
            req.user = user;
            return true;

        } catch(e) {
            console.log(e)
            throw new UnauthorizedException({'message' : 'Unauthorized user'})
        }
    }
}