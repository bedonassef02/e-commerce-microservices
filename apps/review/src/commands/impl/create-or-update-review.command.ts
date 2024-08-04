import { ReviewDto } from '@app/common/dto/review/review.dto';

export class CreateOrUpdateReviewCommand {
  constructor(public readonly reviewDto: ReviewDto) {}
}
