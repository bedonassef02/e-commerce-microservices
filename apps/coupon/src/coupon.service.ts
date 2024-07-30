import { Injectable } from '@nestjs/common';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  findOne(code: string): Observable<Coupon> {
    return from(this.couponRepository.findOne({ where: { code } }));
  }

  create(couponDto: CreateCouponDto): Observable<Coupon> {
    return from(this.couponRepository.save(couponDto));
  }
}
