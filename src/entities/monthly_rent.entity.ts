import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Tenant } from './tenant.entity';

@Entity()
export class MonthlyRent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @ManyToOne(() => Property, { eager: true })
  @JoinColumn({ name: 'id_property' })
  property: Property;

  @ManyToOne(() => Tenant, { eager: true })
  @JoinColumn({ name: 'id_tenant' })
  tenant: Tenant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
