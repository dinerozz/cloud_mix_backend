import { Model } from 'sequelize-typescript';
interface UserCreationAttributes {
    username: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: string;
    username: string;
    password: string;
    refreshToken: string;
}
export {};
