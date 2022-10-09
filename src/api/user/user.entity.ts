import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../model/base.entity';
import { Cart } from '../../model/cart.entity';
import { Rating } from '../../model/rating.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
