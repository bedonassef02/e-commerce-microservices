import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { Commands } from '@app/common/utils/commands';
import { ResetPasswordDto } from '@app/common/dto/auth/reset-password.dto';
import { ChangePasswordDto } from '@app/common/dto/auth/change-password.dto';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { User } from '@app/common/decorators/user.decorator';
import { ForgetPasswordDto } from '@app/common/dto/auth/forget-password.dto';
import { Public } from '@app/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { TwoFactorDto } from '@app/common/dto/auth/two-factor.dto';

@UseGuards(AuthGuard)
@ApiTags('2fa')
@Controller({ path: 'auth/2fa', version: '1' })
@UseInterceptors(RpcExceptionInterceptor)
export class TwoFactorController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly twoFactorService: ClientProxy,
  ) {}

  @Post('generate')
  generate(@User('id') id: string) {
    return this.twoFactorService.send(
      Commands.Auth.TWO_FACTOR.GENERATE_SECRET,
      id,
    );
  }

  @Post('verify')
  verify(@User('id') id: string, @Body() twoFactorDto: TwoFactorDto) {
    twoFactorDto.user = id;
    return this.twoFactorService.send(
      Commands.Auth.TWO_FACTOR.VERIFY,
      twoFactorDto,
    );
  }
}
