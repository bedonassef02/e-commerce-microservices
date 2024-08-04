import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrUpdateReviewCommand } from '../impl/create-or-update-review.command';
import { ReviewService } from '../../review.service';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { switchMap } from 'rxjs/operators';
import { Review } from '../../entities/review.entity';
import { from, lastValueFrom } from 'rxjs';

@CommandHandler(CreateOrUpdateReviewCommand)
export class CreateOrUpdateReviewHandler
  implements ICommandHandler<CreateOrUpdateReviewCommand>
{
  constructor(
    private readonly reviewService: ReviewService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(command: CreateOrUpdateReviewCommand): Promise<Review> {
    return lastValueFrom(
      this.reviewService.findOne(command.reviewDto).pipe(
        switchMap((review: Review) => {
          if (review) {
            return from(
              this.reviewService.update(review.id, command.reviewDto),
            );
          }
          return from(this.reviewService.create(command.reviewDto));
        }),
      ),
    );
  }
}
