import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { UserDto } from '@app/users/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(@Body() user: UserDto) {
    console.log('user', this.authService.login(user));
    return this.authService.login(user);
  }
}
