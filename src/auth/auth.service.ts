import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { v4 as uuid } from "uuid";
import { Response } from "express";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectModel(User)
    private userModel: User,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto, response: Response) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
    response.cookie("jwt", tokens.accessToken, {
      httpOnly: true,
      domain: "http://localhost:5173",
    });
    return tokens;
  }

  async register(userDto: CreateUserDto, response: Response) {
    const candidate = await this.userService.getUserByEmail(userDto.username);

    if (userDto.username.length === 0 || userDto.password.length === 0) {
      throw new HttpException(
        "Email or password should not be empty",
        HttpStatus.BAD_REQUEST
      );
    }

    if (candidate) {
      throw new HttpException(
        "User with given email address already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user);
    response.cookie("jwt", tokens.accessToken, {
      httpOnly: true,
      domain: "http://localhost:5173",
    });
    return tokens;
  }

  async refreshToken(refresh: string) {
    try {
      const { jti, sub } = this.jwtService.verify(refresh);

      const user = await this.userService.getUserById(sub);

      if (user && user.refreshToken === refresh) {
        const newTokens = await this.generateTokens(user);

        user.refreshToken = newTokens.refreshToken;
        await user.save();

        return newTokens;
      }
    } catch (e) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async logout(userId: string): Promise<void> {
    await this.userModel.update(
      { refreshToken: null },
      { where: { id: userId } }
    );
  }

  // TODO: Store refresh token in httpOnly cookies
  private async generateTokens(user: User) {
    const accessTokenPayload = {
      username: user.username,
      id: user.id,
    };
    const refreshTokenPayload = { sub: user.id, jti: uuid() };
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: "30m",
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: "7d",
    });
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.username);
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordsEqual) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Invalid credentials, check your email or password",
    });
  }
}
