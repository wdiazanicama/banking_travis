import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountTypeOrm } from 'src/accounts/command/infra/persistence/typeorm/entities/account.typeorm';
import { TransactionsController } from './api/transactions.controller';
import { TransactionsService } from './command/application/services/transactions.service';
import { TransferDomainService } from './command/domain/services/transfer.domain.service';
import { TransactionsQuery } from './query/queries/transactions.query';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeOrm])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransferDomainService, TransactionsQuery],
})
export class TransactionsModule {}
