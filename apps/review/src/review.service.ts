import { Injectable } from '@nestjs/common';
import { ReviewDto } from '@app/common/dto/review/review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create(reviewDto: ReviewDto): Promise<Review> {
    return this.reviewRepository.save(reviewDto);
  }

  async update(id: number, reviewDto: ReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, reviewDto);
    return this.reviewRepository.findOneBy({ id });
  }

  findOne(reviewDto: ReviewDto): Observable<Review> {
    return from(
      this.reviewRepository.findOneBy({
        user: reviewDto.user,
        product: reviewDto.product,
      }),
    );
  }

  findAll(product: string){
    return from(this.reviewRepository.findAndCountBy({product}));
  }
}
