import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { Op } from "sequelize";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async findUsersByName(username: string): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: ["id", "username"],
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
    });
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findByPk(userId);
    return user;
  }

  async getCurrentUser(headers: Headers) {
    const token = headers["authorization"].split(" ")[1];
    const user = this.jwtService.decode(token);
    return this.userRepository.findOne({
      where: { id: user["id"] },
      attributes: ["id", "username"],
    });
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }
}
