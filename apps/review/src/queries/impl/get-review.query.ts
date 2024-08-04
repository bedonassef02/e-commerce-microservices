import { ReviewDto } from '@app/common/dto/review/review.dto';

export class GetReviewQuery {
  constructor(public readonly reviewDto: ReviewDto) {}
}
