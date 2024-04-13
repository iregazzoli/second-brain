import { Controller, Get, UseGuards, Headers, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Headers('authorization') authHeader: string){
    const token = this.extractTokenFromHeader(authHeader);
    const user = await this.usersService.findUserByJwt(token);

    await this.usersService.remove(user.id);
    return { message: 'User deleted successfully' };
  }
}