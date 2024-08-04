import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReviewService } from '../../review.service';
import { GetReviewsQuery } from '../impl/get-reviews.query';

@QueryHandler(GetReviewsQuery)
export class GetReviewsHandler implements IQueryHandler<GetReviewsQuery> {
  constructor(private readonly reviewService: ReviewService) {}

  async execute(query: GetReviewsQuery) {
    return this.reviewService.findAll(query.product);
  }
}
