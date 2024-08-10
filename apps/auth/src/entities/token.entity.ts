import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  resetToken: string;
  @Column({ type: 'bigint' })
  expirationDate: number;
}
