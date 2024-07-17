import { CreateUserDto } from '@app/common/dto/user/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
