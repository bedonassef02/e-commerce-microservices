import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './entities/coupon.entity';
import { Model } from 'mongoose';
import { CreateCouponDto } from '@app/common/dto/coupon/create-coupon.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {}

  findAll(): Observable<Coupon[]> {
    return from(this.couponModel.find().exec());
  }

  findOne(code: string): Observable<Coupon> {
    return from(this.couponModel.findOne({ code }));
  }

  create(couponDto: CreateCouponDto): Observable<Coupon> {
    return from(this.couponModel.create(couponDto));
  }

  deactivate(code: string) {
    // TODO: implement this
  }
}
