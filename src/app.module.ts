import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dev-db', 
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'second_brain',
      synchronize: true,
      logging: false,
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migration/**/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}