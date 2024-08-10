import { Column } from 'typeorm';

export class Token {
  @Column({ unique: true })
  user: string;
  @Column()
  resetToken: number;
  @Column()
  expirationDate: Date;
}
