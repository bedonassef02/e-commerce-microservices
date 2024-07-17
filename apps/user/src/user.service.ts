import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { hash } from '@app/common/helpers/password.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(user: CreateUserDto) {
    user.password = hash(user.password);
    return this.userModel.create(user);
  }

  findById(id: string): Observable<User | undefined> {
    return from(this.userModel.findById(id));
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
