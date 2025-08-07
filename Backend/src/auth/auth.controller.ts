import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { hashPassword } from '../common/utils/hash-password';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const hashedPassword = await hashPassword(registerDto.password);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.authService.login(user);
  }
}