import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { hash } from '@app/common/utils/helpers/password.helper';

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
}
