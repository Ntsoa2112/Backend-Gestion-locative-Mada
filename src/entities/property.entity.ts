import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Owner } from './owner.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id_property: number;

  @Column()
  rent: number;

  @Column({ length: 50 })
  currency: string;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 50 })
  surface_area: string;

  @Column({ length: 50 })
  postal_address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Owner, (owner) => owner.properties)
  @JoinColumn({ name: 'id_owner' })
  owner: Owner;

  @Column()
  id_owner: number;
}
