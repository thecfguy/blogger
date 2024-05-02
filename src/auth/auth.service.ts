import { UsersService } from '@app/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload:LoginDto): Promise<any> {   
    const user = await this.userService.findByUsername(payload.username);
       
    if (user && user.password === payload.password) {     
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const validateUser= await this.validateUser(user)
    const payload = { username: validateUser.username, sub: validateUser.id, role:validateUser.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
