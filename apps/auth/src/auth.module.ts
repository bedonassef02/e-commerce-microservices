import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { authHandlers } from './commands';
import { CommonModule, MailMP, UserMP } from '@app/common';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { TokenService } from '@app/common/services/token.service';
import { PasswordController } from './utils/controllers/password.controller';
import { passwordHandlers } from './utils/commands';
import { PasswordService } from './utils/services/password.service';
import { connectToMysql } from '@app/common/utils/modules/connect-to-mysql.helper';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authValidation } from '@app/common/utils/validation/services/auth.validation';
import { configValidation } from '@app/common/utils/helpers/config-validation.helper';
import { TwoFactorService } from './utils/services/two-factor-auth.service';

@Module({
  imports: [
    CommonModule.register(configValidation(authValidation)),
    CqrsModule,
    registerJwt(),
    connectToMysql(Token.name, [Token]),
    TypeOrmModule.forFeature([Token]),
    ClientsModule.register([registerClient(UserMP), registerClient(MailMP)]),
  ],
  controllers: [AuthController, PasswordController],
  providers: [
    AuthService,
    TokenService,
    PasswordService,
    TwoFactorService,
    ...authHandlers,
    ...passwordHandlers,
  ],
})
export class AuthModule {}
