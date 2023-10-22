import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Headers } from '@nestjs/common';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/user/:id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/current')
  getCurrentUser(@Headers() headers) {
    return this.userService.getCurrentUser(headers);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
