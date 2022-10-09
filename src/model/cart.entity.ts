import { Column, OneToMany, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from '../api/user/user.entity';

@Entity({ name: 'cart' })
export class Cart extends BaseEntity {
  @Column({ type: 'int', default: 0 })
  totalAmount: number;

  @Column({ type: 'int', default: 0 })
  numberOfItems: number;

  @OneToMany(() => Product, (product) => product.cart)
  products: Product[];

  @OneToOne(() => User, (user) => user.cart)
  user: User;
}
