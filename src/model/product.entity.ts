import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Cart } from './cart.entity';
import { Rating } from './rating.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false, unsigned: true })
  price: number;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
