import { CustomerTypeOrm } from 'src/customers/command/infra/persistence/typeorm/entities/customer.typeorm';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('account')
export class AccountTypeOrm {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'account_id',
    unsigned: true,
  })
  public id: number;

  @Column('varchar', {
    name: 'number',
    unique: true,
    length: 50,
    nullable: false,
  })
  public number: string;

  @Column('decimal', {
    name: 'balance',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  public balance: number;

  @Column('tinyint', {
    name: 'is_locked',
    width: 1,
    unsigned: true,
    default: false,
    nullable: false,
  })
  public isLocked: boolean;

  @Column('bigint', { name: 'customer_id', unsigned: true, nullable: false })
  public customerId: number;

  @ManyToOne((type) => CustomerTypeOrm)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  public customer: CustomerTypeOrm;

  @Column('datetime', { name: 'created_at', nullable: false })
  public createdAt: string;

  @Column('datetime', { name: 'updated_at', nullable: false })
  public updatedAt: string;
}
