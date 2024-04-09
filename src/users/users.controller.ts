import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body('email') userName: string, @Body('password') password: string) {
    return this.usersService.createUser(userName, password);
  }

  private extractTokenFromHeader(authHeader: string): string {
    return authHeader && authHeader.split(' ')[1]; // Bearer <token>
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async get(@Headers('authorization') authHeader: string){
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);
    return user;
  }
}