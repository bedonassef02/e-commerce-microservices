import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  code: string;
  @Column()
  discount: number;
  @Column()
  minPurchaseAmount: number;
  @Column({ default: 0 })
  usageCount: number;
  @Column()
  usageLimitPerCustomer: number;
  @Column({ default: 100 })
  usageLimit: number;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  expirationDate: Date;
}
