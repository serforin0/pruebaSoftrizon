import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../Entity/user.entity"
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwhebfqqhiuwebnjqwehb'
    });
  }

  async validate(payload: {username: string}) {
    const {username} = payload;
    const user = await this.repo.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}