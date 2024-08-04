import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map } from 'rxjs';
import { GetReviewQuery } from '../impl/get-review.query';
import { ReviewService } from '../../review.service';
import { Review } from '../../entities/review.entity';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';

@QueryHandler(GetReviewQuery)
export class GetReviewHandler implements IQueryHandler<GetReviewQuery> {
  constructor(private readonly reviewService: ReviewService) {}

  async execute(query: GetReviewQuery) {
    return from(this.reviewService.findOne(query.reviewDto)).pipe(
      map((review: Review) => {
        if (review) {
          return review;
        }
        throw new RpcNotFoundException(Review.name);
      }),
    );
  }
}
