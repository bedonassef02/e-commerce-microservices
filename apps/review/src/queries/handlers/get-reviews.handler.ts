import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReviewService } from '../../review.service';
import { GetReviewsQuery } from '../impl/get-reviews.query';
import { Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { map } from 'rxjs';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@QueryHandler(GetReviewsQuery)
export class GetReviewsHandler implements IQueryHandler<GetReviewsQuery> {
  constructor(
    private readonly reviewService: ReviewService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
  ) {}

  async execute(query: GetReviewsQuery) {
    return this.productService.send(Commands.FIND_BY_ID, query.product).pipe(
      map(() => {
        return this.reviewService.findAll(query.product);
      }),
      throwException,
    );
  }
}
