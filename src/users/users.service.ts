import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { Users } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>,
    private jwt: JwtService) {

    }

    async registerUser(registerDTO: RegisterUserDto) {
        const {username, password} = registerDTO;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);

        const user = new Users();
        user.username = username;
        user.password = hashed;
        user.salt = salt; 

        this.repo.create(user);
        try{
            return await this.repo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Somethin went wrong,user was not created');
        }
    }


    async loginUser(userLoginDto: UserLoginDto) {
        const { username, password } = userLoginDto;

        const user = await this.repo.findOne({username});

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const salt = user.salt;
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(isPasswordMatch){
            const jwtPayLoad = {username};
            const jwtToken = await this.jwt.signAsync(jwtPayLoad, { expiresIn: '1d', algorithm: 'HS256'});

            return { token: jwtToken};
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
