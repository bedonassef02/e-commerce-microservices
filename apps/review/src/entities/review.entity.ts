import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  stars: number;
  @Column()
  product: string;
  @Column()
  user: string;
}
