import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from '../Entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'jwhebfqqhiuwebnjqwehb',
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1d'
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [UsersService, JwtCustomStrategy],
  controllers: [UsersController],
  exports: [PassportModule, JwtCustomStrategy]
})
export class UsersModule {}
