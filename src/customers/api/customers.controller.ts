import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AddCustomer } from '../command/application/commands/add.customer';
import { AddCustomerRequestDto } from '../command/application/dto/add.customer.request.dto';
import { AddCustomerResponseDto } from '../command/application/dto/add.customer.response.dto';
import { DeleteCustomerResponseDto } from '../command/application/dto/delete.customer.response.dto';
import { CustomerCommandMapper } from '../command/application/mappers/customer.command.mapper';
import { CustomersService } from '../command/application/services/customers.service';
import { CustomerDto } from '../query/dto/customer.dto';
import { CustomersQuery } from '../query/queries/customers.query';

@Controller('customers')
export class CustomersController {
  constructor(
    private customersCommand: CustomersService,
    private customersQuery: CustomersQuery,
  ) {}

  @Post()
  add(
    @Body() addCustomerRequestDto: AddCustomerRequestDto,
  ): Promise<AddCustomerResponseDto> {
    const addCustomer: AddCustomer = CustomerCommandMapper.toAddCustomerCommand(
      addCustomerRequestDto,
    );
    return this.customersCommand.add(addCustomer);
  }

  @Delete('/:id')
  async delete(
    @Param('id') customerId: number,
  ): Promise<DeleteCustomerResponseDto> {
    const customer: DeleteCustomerResponseDto = await this.customersCommand.delete(
      customerId,
    );
    if (customer.id === null) {
      throw new NotFoundException('Not found');
    }
    return customer;
  }

  @Get()
  getList(): Promise<CustomerDto[]> {
    return this.customersQuery.getList();
  }

  @Get('/:id')
  async getById(@Param('id') customerId: number): Promise<CustomerDto> {
    const customer: CustomerDto = await this.customersQuery.getById(customerId);
    if (customer.id === null) {
      throw new NotFoundException('Not found');
    }
    return customer;
  }
}
