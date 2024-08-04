import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { CommonModule, ReviewMP } from '@app/common';
import { registerJwt } from '@app/common/utils/modules/register-jwt.helper';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { TokenService } from '@app/common/services/token.service';

@Module({
  imports: [
    CommonModule,
    registerJwt(),
    ClientsModule.register([registerClient(ReviewMP)]),
  ],
  controllers: [ReviewController],
  providers: [TokenService],
})
export class ReviewModule {}
