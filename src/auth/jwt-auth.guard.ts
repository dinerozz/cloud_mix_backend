import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      if (!req.cookies || !req.cookies.jwt) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const token = req.cookies.jwt;
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      console.log("err", e);
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
