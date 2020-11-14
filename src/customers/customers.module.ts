import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomersController } from './api/customers.controller';
import { CustomersService } from './command/application/services/customers.service';
import { CustomersQuery } from './query/queries/customers.query';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CustomersQuery],
})
export class CustomersModule {}
