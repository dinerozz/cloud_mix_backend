import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getCurrentUser(headers: any): Promise<User>;
    getAll(): Promise<User[]>;
}
