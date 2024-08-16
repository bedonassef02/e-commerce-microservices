import { Injectable } from '@nestjs/common';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';
import { from, switchMap, Observable, map } from 'rxjs';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CouponHistory } from './entities/coupon-history.entity';
import { Model } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectModel(CouponHistory.name)
    private readonly couponModel: Model<CouponHistory>,
  ) {}

  findOne(code: string): Observable<Coupon> {
    return from(this.couponRepository.findOne({ where: { code } }));
  }

  create(couponDto: CreateCouponDto): Observable<Coupon> {
    const newCoupon = this.couponRepository.create(couponDto);
    return from(this.couponRepository.save(newCoupon));
  }

  use(couponDto: UseCouponDto): Observable<Coupon> {
    return from(this.couponRepository.findOneBy({ code: couponDto.code })).pipe(
      switchMap((coupon: Coupon) => {
        coupon.usageCount += 1;
        return from(this.couponModel.create(couponDto)).pipe(
          switchMap(() => from(this.couponRepository.save(coupon))),
        );
      }),
    );
  }

  removeMany(): Observable<number> {
    const currentDate = new Date();

    return from(
      this.couponRepository.delete({ expirationDate: LessThan(currentDate) }),
    ).pipe(
      map((result) => result.affected || 0), // Return the number of deleted coupons
    );
  }
}
