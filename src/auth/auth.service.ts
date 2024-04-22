import { UserDto } from '@app/users/dto/user.dto';
import { UsersService } from '@app/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findAll({ username });
    if (user.length && user[0].password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    
    const findUser= await this.userService.findbyEmail(user.email)
    if(!findUser){
      throw new NotFoundException('user not found')
    }

    const payload = { email: user.email, sub: findUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
