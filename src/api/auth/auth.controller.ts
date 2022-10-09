import { CreateUserDto } from './../user/user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() authSignUpDto: CreateUserDto): Promise<string> {
    return this.authService.signUp(authSignUpDto);
  }
}
