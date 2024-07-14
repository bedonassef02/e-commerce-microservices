import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(user: CreateUserDto): Observable<User> {
    return from(this.userModel.create(user));
  }

  findById(id: string): Observable<User | undefined> {
    return from(this.userModel.findById(id));
  }
  findByEmail(email: string): Observable<User | undefined> {
    return from(this.userModel.findOne({ email }));
  }
}
