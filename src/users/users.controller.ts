import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegisterUserDto){
        return this.usersService.registerUser(regDTO);
    }

    @Post('login')
    signin(@Body(ValidationPipe) loginDTO: UserLoginDto){
        return this.usersService.loginUser(loginDTO);
        
    }
}
