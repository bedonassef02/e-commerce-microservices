import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../impl/refresh-token.command';
import { TokenService } from '@app/common/services/token.service';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(private readonly tokenService: TokenService) {}

  async execute(command: RefreshTokenCommand) {
    try {
      const payload: any = this.tokenService.verify(command.refreshToken);
      payload.id = payload.sub;
      const access_token: string = this.tokenService.generate(payload);
      return { access_token };
    } catch (err) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Refresh token failed',
      });
    }
  }
}
