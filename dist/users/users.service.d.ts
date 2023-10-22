import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: typeof User, jwtService: JwtService);
    createUser(dto: CreateUserDto): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getCurrentUser(headers: Headers): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByEmail(username: string): Promise<User>;
}
