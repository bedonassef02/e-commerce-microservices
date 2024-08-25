import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { hash } from '@app/common/utils/helpers/password.helper';
import { TwoFactorDto } from '@app/common/dto/auth/two-factor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(user: CreateUserDto): Observable<UserDocument> {
    user.password = hash(user.password);
    return from(this.userModel.create(user));
  }

  findById(id: string): Observable<User | undefined> {
    return from(this.userModel.findById(id));
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }));
  }

  updatePassword(id: string, password: string) {
    return from(this.userModel.findByIdAndUpdate(id, { password }));
  }

  update2FA(twoFactorDto: TwoFactorDto) {
    return this.userModel.findByIdAndUpdate(twoFactorDto.user, twoFactorDto, {
      new: true,
    });
  }
}
