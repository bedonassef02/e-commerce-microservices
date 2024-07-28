import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { GetUserByEmailCommand } from '../impl/get-user-by-email.command';
import { from, Observable } from 'rxjs';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUserByEmailCommand)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailCommand>
{
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserByEmailCommand) {
    return from(this.userService.findByEmail(query.email));
  }
}
