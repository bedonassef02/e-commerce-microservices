import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrUpdateReviewCommand } from './commands/impl/create-or-update-review.command';
import { ReviewDto } from '@app/common/dto/review/review.dto';
import { GetReviewQuery } from './queries/impl/get-review.query';
import { GetReviewsQuery } from './queries/impl/get-reviews.query';

@Controller()
export class ReviewController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(Commands.Review.CREATE_OR_UPDATE)
  create(reviewDto: ReviewDto) {
    return this.commandBus.execute(new CreateOrUpdateReviewCommand(reviewDto));
  }

  @MessagePattern(Commands.Review.FIND_ONE)
  findOne(reviewDto: ReviewDto) {
    return this.queryBus.execute(new GetReviewQuery(reviewDto));
  }

  @MessagePattern(Commands.Review.FIND_ALL)
  findAll(product: string) {
    return this.queryBus.execute(new GetReviewsQuery(product));
  }
}
