import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@app/common/dto/user/create-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userModel.create(user);
  }

  findById(id: string): Observable<User | undefined> {
    return from(this.userModel.findById(id));
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({ email }));
  }

  async validateUser(email: string, password: string): Promise<any> {
    return from(
      this.findByEmail(email).pipe(
        map(async (user: User) => {
          if (user && (await bcrypt.compare(password, user.password))) {
            return plainToClass(CreateUserDto, user);
          }
          return null;
        }),
      ),
    );
  }
}
