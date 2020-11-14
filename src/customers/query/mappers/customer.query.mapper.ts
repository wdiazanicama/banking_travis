import { CustomerTypeOrm } from 'src/customers/command/infra/persistence/typeorm/entities/customer.typeorm';
import { CustomerDto } from '../dto/customer.dto';

export class CustomerQueryMapper {
  public static toDtos(ormCustomers: []): CustomerDto[] {
    return ormCustomers.map((ormCustomer) => this.toDto(ormCustomer));
  }

  public static toDto(ormCustomer: any): CustomerDto {
    const customerDto: CustomerDto = new CustomerDto();
    customerDto.id = parseInt(ormCustomer.customer_id, 10);
    customerDto.firstName = ormCustomer.first_name;
    customerDto.lastName = ormCustomer.last_name;
    customerDto.isActive = Boolean(ormCustomer.is_active).valueOf();
    customerDto.createdAt = ormCustomer.created_at;
    customerDto.updatedAt = ormCustomer.updated_at;
    return customerDto;
  }

  public static toEmpty(): CustomerDto {
    const customerDto: CustomerDto = new CustomerDto();
    customerDto.id = null;
    customerDto.firstName = null;
    customerDto.lastName = null;
    customerDto.isActive = false;
    customerDto.createdAt = null;
    customerDto.updatedAt = null;
    return customerDto;
  }
}
