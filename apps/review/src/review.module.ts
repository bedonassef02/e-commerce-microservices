import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule, ProductMP } from '@app/common';
import { connectToMysql } from '@app/common/utils/modules/connect-to-mysql.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { registerClient } from '@app/common/utils/helpers/register-client.helper';
import { Review } from './entities/review.entity';
import { reviewHandlers } from './commands';
import { reviewQueries } from './queries';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    connectToMysql(Review.name, [Review]),
    TypeOrmModule.forFeature([Review]),
    ClientsModule.register([registerClient(ProductMP)]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ...reviewHandlers, ...reviewQueries],
})
export class ReviewModule {}
