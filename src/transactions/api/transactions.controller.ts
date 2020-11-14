import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountTypeOrm } from 'src/accounts/command/infra/persistence/typeorm/entities/account.typeorm';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { PerformDeposit } from '../command/application/commands/perform.deposit';
import { PerformTransfer } from '../command/application/commands/perform.transfer';
import { PerformWithdraw } from '../command/application/commands/perform.withdraw';
import { PerformDepositRequestDto } from '../command/application/dto/perform.deposit.request.dto';
import { PerformDepositResponseDto } from '../command/application/dto/perform.deposit.response.dto';
import { PerformTransferRequestDto } from '../command/application/dto/perform.transfer.request.dto';
import { PerformTransferResponseDto } from '../command/application/dto/perform.transfer.response.dto';
import { PerformWithdrawRequestDto } from '../command/application/dto/perform.withdraw.request.dto';
import { PerformWithdrawResponseDto } from '../command/application/dto/perform.withdraw.response.dto';
import { TransactionCommandMapper } from '../command/application/mappers/transaction.command.mapper';
import { TransactionsService } from '../command/application/services/transactions.service';
import { TransactionTypeOrm } from '../command/infra/persistence/typeorm/entities/transaction.typeorm';
import { TransactionDto } from '../query/dto/transaction.dto';
import { TransactionsQuery } from '../query/queries/transactions.query';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsCommand: TransactionsService,
    private transactionsQuery: TransactionsQuery,
  ) {}

  @Post('deposit')
  @Transaction()
  performDeposit(
    @Body() performDepositRequestDto: PerformDepositRequestDto,
    @TransactionRepository(TransactionTypeOrm)
    transactionRepository: Repository<TransactionTypeOrm>,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformDepositResponseDto> {
    const peformDeposit: PerformDeposit = TransactionCommandMapper.toPerformDepositCommand(
      performDepositRequestDto,
    );
    return this.transactionsCommand.performDeposit(
      peformDeposit,
      transactionRepository,
      accountRepository,
    );
  }

  @Post('withdraw')
  @Transaction()
  performWithdraw(
    @Body() performWithdrawRequestDto: PerformWithdrawRequestDto,
    @TransactionRepository(TransactionTypeOrm)
    transactionRepository: Repository<TransactionTypeOrm>,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformWithdrawResponseDto> {
    const performWithdraw: PerformWithdraw = TransactionCommandMapper.toPerformWithdrawCommand(
      performWithdrawRequestDto,
    );
    return this.transactionsCommand.performWithdraw(
      performWithdraw,
      transactionRepository,
      accountRepository,
    );
  }

  @Post('transfer')
  @Transaction()
  performTransfer(
    @Body() performTransferRequestDto: PerformTransferRequestDto,
    @TransactionRepository(TransactionTypeOrm)
    transactionRepository: Repository<TransactionTypeOrm>,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformTransferResponseDto> {
    const performTransfer: PerformTransfer = TransactionCommandMapper.toPerformTransferCommand(
      performTransferRequestDto,
    );
    return this.transactionsCommand.performTransfer(
      performTransfer,
      transactionRepository,
      accountRepository,
    );
  }

  @Get()
  getList(): Promise<TransactionDto[]> {
    return this.transactionsQuery.getList();
  }

  @Get('accounts/:id')
  getListByAccountId(
    @Param('id') accountId: number,
  ): Promise<TransactionDto[]> {
    return this.transactionsQuery.getListByAccountId(accountId);
  }
}
