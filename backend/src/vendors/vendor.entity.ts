import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // <- ici
  user: User;

  @Column()
  business_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Product, (product) => product.vendor)
  products: Product[];
}
