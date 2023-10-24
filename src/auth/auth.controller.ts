import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { Request } from "express";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(userDto, response);
  }

  @Post("/register")
  register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.register(userDto, response);
  }

  @Post("refresh")
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post("logout")
  async logout(@Body("userId") userId: string): Promise<void> {
    await this.authService.logout(userId);
  }
}
