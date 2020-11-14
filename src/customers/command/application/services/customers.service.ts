import { ConflictException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CustomerTypeOrm } from '../../infra/persistence/typeorm/entities/customer.typeorm';
import { AddCustomer } from '../commands/add.customer';
import { AddCustomerResponseDto } from '../dto/add.customer.response.dto';
import { DeleteCustomerResponseDto } from '../dto/delete.customer.response.dto';
import { CustomerCommandMapper } from '../mappers/customer.command.mapper';

@Injectable()
export class CustomersService {
  constructor() {}

  async add(addCustomer: AddCustomer): Promise<AddCustomerResponseDto> {
    let customerTypeOrm: CustomerTypeOrm;
    try {
      customerTypeOrm = CustomerCommandMapper.toCustomerTypeOrm(addCustomer);
      const customerRepository = getRepository(CustomerTypeOrm);
      const ormResult = await customerRepository.insert(customerTypeOrm);
      const id = parseInt(ormResult.identifiers[0].id);
      customerTypeOrm.id = id;
    } catch (e) {
      console.log(e);
      throw new ConflictException(customerTypeOrm);
    }
    return CustomerCommandMapper.toAddCustomerResponseDto(customerTypeOrm);
  }

  async delete(customerId: number): Promise<DeleteCustomerResponseDto> {
    let responseDto: DeleteCustomerResponseDto;
    let customerTypeOrm: CustomerTypeOrm;
    try {
      const customerRepository = getRepository(CustomerTypeOrm);
      const customerTypeOrm = await customerRepository.findOne({
        id: customerId,
      });
      if (customerTypeOrm === null || customerTypeOrm === undefined) {
        return CustomerCommandMapper.toEmptyDeleteCustomerResponseDto();
      }
      await customerRepository.delete(customerId);
      responseDto = CustomerCommandMapper.toDeleteCustomerResponseDto(
        customerTypeOrm,
      );
    } catch (e) {
      console.log(e);
      throw new ConflictException(customerTypeOrm);
    }
    return responseDto;
  }
}
