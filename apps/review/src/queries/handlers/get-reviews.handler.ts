import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { from, map } from 'rxjs';
import { GetReviewQuery } from '../impl/get-review.query';
import { ReviewService } from '../../review.service';
import { Review } from '../../entities/review.entity';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';
import { GetReviewsQuery } from '../impl/get-reviews.query';

@QueryHandler(GetReviewsQuery)
export class GetReviewsHandler implements IQueryHandler<GetReviewsQuery> {
  constructor(private readonly reviewService: ReviewService) {}

  async execute(query: GetReviewsQuery) {
    return this.reviewService.findAll(query.product)
  }
}
