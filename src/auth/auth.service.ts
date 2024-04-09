import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { AuthDto } from "./dto";
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";


@Injectable({})

export class AuthService{

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    const existingUser = await this.usersService.findUserByEmail(dto.email);
    
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hash = await argon.hash(dto.password);

    const user = await this.usersService.createUser(dto.email, hash);


    return user;
  }

  async signIn(dto: AuthDto) {
    const user = await this.usersService.findUserByEmail(dto.email);

    if(!user) throw new UnauthorizedException('Invalid user');

    const pwMatchs = await argon.verify(user.password, dto.password)

    if(!pwMatchs) throw new UnauthorizedException('Invalid password')

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}