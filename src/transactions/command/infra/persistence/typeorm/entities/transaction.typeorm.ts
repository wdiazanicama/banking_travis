import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AccountTypeOrm } from 'src/accounts/command/infra/persistence/typeorm/entities/account.typeorm';

@Entity('transaction')
export class TransactionTypeOrm {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'transaction_id',
    unsigned: true,
  })
  public id: number;

  @Column('char', { name: 'type', length: 1, nullable: false })
  public type: string;

  @Column('bigint', {
    name: 'account_id_from',
    unsigned: true,
    nullable: true,
  })
  public fromAccountId: number;

  @ManyToOne((type) => AccountTypeOrm)
  @JoinColumn({ name: 'account_id_from', referencedColumnName: 'id' })
  public fromAccount: AccountTypeOrm;

  @Column('bigint', {
    name: 'account_id_to',
    unsigned: true,
    nullable: true,
  })
  public toAccountId: number;

  @ManyToOne((type) => AccountTypeOrm)
  @JoinColumn({ name: 'account_id_to', referencedColumnName: 'id' })
  public toAccount: AccountTypeOrm;

  @Column('decimal', {
    name: 'amount',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  public amount: number;

  @Column('tinyint', {
    name: 'status',
    width: 2,
    unsigned: true,
    nullable: false,
  })
  public status: number;

  @Column('datetime', { name: 'created_at', nullable: false })
  public createdAt: string;
}
