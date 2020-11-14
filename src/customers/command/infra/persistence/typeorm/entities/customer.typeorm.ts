import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class CustomerTypeOrm {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'customer_id',
    unsigned: true,
  })
  public id: number;

  @Column('varchar', { name: 'first_name', length: 75, nullable: false })
  public firstName: string;

  @Column('varchar', { name: 'last_name', length: 75, nullable: false })
  public lastName: string;

  @Column('tinyint', {
    name: 'is_active',
    width: 1,
    unsigned: true,
    default: true,
    nullable: false,
  })
  public isActive: boolean;

  @Column('datetime', { name: 'created_at', nullable: false })
  public createdAt: string;

  @Column('datetime', { name: 'updated_at', nullable: false })
  public updatedAt: string;

  public static withId(id: number): CustomerTypeOrm {
    let customerTypeOrm: CustomerTypeOrm = new CustomerTypeOrm();
    customerTypeOrm.id = Number(id);
    return customerTypeOrm;
  }
}
