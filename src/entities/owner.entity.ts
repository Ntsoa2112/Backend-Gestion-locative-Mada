import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id_owner: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];
}
