import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { User } from '../../entities/user.entity';
import { GetUserByEmailCommand } from '../impl/get-user-by-email.command';

@QueryHandler(GetUserByEmailCommand)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailCommand>
{
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserByEmailCommand): Promise<User> {
    return this.userService.findByEmail(query.email);
  }
}
