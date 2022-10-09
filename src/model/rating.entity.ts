import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from '../api/user/user.entity';

@Entity({ name: 'rating' })
export class Rating extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @Column({ type: 'int', nullable: false })
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Product, (product) => product.ratings)
  product: Product;
}
