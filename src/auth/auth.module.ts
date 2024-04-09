import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UsersModule,
            ConfigModule.forRoot(),
            JwtModule.register({
              global: true,
              secret: process.env.JWT_SECRET,
            }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}