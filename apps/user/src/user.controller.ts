import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create' })
  create(user: CreateUserDto) {
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'findById' })
  findById(id: string) {
    return this.userService.findById(id);
  }
  @MessagePattern({ cmd: 'findByEmail' })
  findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }
}
