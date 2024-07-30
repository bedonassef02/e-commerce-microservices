import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { GetUserByEmailCommand } from '../impl/get-user-by-email.command';
import { from } from 'rxjs';

@QueryHandler(GetUserByEmailCommand)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailCommand>
{
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserByEmailCommand) {
    return from(this.userService.findByEmail(query.email));
  }
}
