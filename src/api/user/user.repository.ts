import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async createUser(body: CreateUserDto): Promise<string> {
    const user = new User();
    user.username = body.username;
    user.email = body.email;
    user.password = body.password;
    try {
      await this.repository.save(user);
      return 'User created successfully.';
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Email or Username already exists.');
      else if (error.code === '23502')
        throw new BadRequestException(
          'Please provide all the necessary fields',
        );
      else throw new InternalServerErrorException();
    }
  }
}
