import { CreateUserDto } from './../user/user.dto';
import { UserRepository } from './../user/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}
  async signUp(authSignUpDto: CreateUserDto): Promise<string> {
    return this.userRepository.createUser(authSignUpDto);
  }
}
