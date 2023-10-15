import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Property } from './property.entity';
import { MonthlyRent } from './monthly_rent.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id_tenant: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 50 })
  postal_address: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  telephone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Property)
  @JoinColumn({ name: 'id_property' })
  property: Property;

  @Column()
  id_property: number;

  @OneToMany(() => MonthlyRent, (monthlyRent) => monthlyRent.tenant, {
    cascade: true,
  })
  monthlyRents: MonthlyRent[];
}
