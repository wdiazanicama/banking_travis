import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountsController } from './api/accounts.controller';
import { AccountsService } from './command/application/service/accounts.service';
import { AccountsQuery } from './query/queries/accounts.query';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AccountsQuery],
})
export class AccountsModule {}
