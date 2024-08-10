import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { USER_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { map } from 'rxjs';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  change(passwordDto: ChangePasswordDto) {
    passwordDto.newPassword = this.hash(passwordDto.newPassword);
    return this.userService.send(Commands.User.UPDATE_PASSWORD, passwordDto);
  }
  hash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  compare(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
