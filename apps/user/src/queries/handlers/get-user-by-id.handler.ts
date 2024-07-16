import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map, Observable } from 'rxjs';
import { GetUserByIdCommand } from '../impl/get-user-by-id.command';
import { UserService } from '../../user.service';
import { User } from '../../entities/user.entity';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdCommand> {
  private readonly logger = new Logger(GetUserByIdHandler.name);
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserByIdCommand): Promise<Observable<User>> {
    return from(this.userService.findById(query.id)).pipe(
      map((user: User) => {
        if (!user) {
          this.logger.error(`User not found with id: ${query.id}`);
          throw new RpcException({ status: 404, message: 'User not found' });
        }
        return user;
      }),
    );
  }
}
