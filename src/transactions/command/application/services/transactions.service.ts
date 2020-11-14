import { ConflictException, Injectable } from '@nestjs/common';
import { AccountCommandMapper } from 'src/accounts/command/application/mappers/account.command.mapper';
import { BankAccount } from 'src/accounts/command/domain/entities/account.entity';
import { AccountTypeOrm } from 'src/accounts/command/infra/persistence/typeorm/entities/account.typeorm';
import { DateTime } from 'src/app/infra/utils/datetime';
import { Repository } from 'typeorm';
import { TransactionStatus } from '../../domain/enums/transaction.status.enum';
import { TransactionType } from '../../domain/enums/transaction.type.enum';
import { TransferDomainService } from '../../domain/services/transfer.domain.service';
import { TransactionTypeOrm } from '../../infra/persistence/typeorm/entities/transaction.typeorm';
import { PerformDeposit } from '../commands/perform.deposit';
import { PerformTransfer } from '../commands/perform.transfer';
import { PerformWithdraw } from '../commands/perform.withdraw';
import { PerformDepositResponseDto } from '../dto/perform.deposit.response.dto';
import { PerformTransferResponseDto } from '../dto/perform.transfer.response.dto';
import { PerformWithdrawResponseDto } from '../dto/perform.withdraw.response.dto';
import { TransactionCommandMapper } from '../mappers/transaction.command.mapper';

@Injectable()
export class TransactionsService {
  constructor(private transferDomainService: TransferDomainService) {}

  async performDeposit(
    performDeposit: PerformDeposit,
    transactionRepository: Repository<TransactionTypeOrm>,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformDepositResponseDto> {
    let transactionTypeOrm: TransactionTypeOrm;
    try {
      let accountTypeOrm: AccountTypeOrm = await accountRepository
        .createQueryBuilder('account')
        .setLock('pessimistic_write')
        .useTransaction(true)
        .where('account.number = :number', {
          number: performDeposit.accountNumber,
        })
        .getOne();
      let account: BankAccount = AccountCommandMapper.toBankAccount(
        accountTypeOrm,
      );
      account.depositMoney(performDeposit.amount);
      accountTypeOrm.balance = Number(account.getBalance());
      accountTypeOrm.updatedAt = DateTime.getUtcDateTime();
      await accountRepository.save(accountTypeOrm);
      transactionTypeOrm = new TransactionTypeOrm();
      transactionTypeOrm.type = TransactionType.DEPOSIT;
      transactionTypeOrm.fromAccount = null;
      transactionTypeOrm.toAccount = accountTypeOrm;
      transactionTypeOrm.amount = Number(performDeposit.amount);
      transactionTypeOrm.status = TransactionStatus.COMPLETED;
      transactionTypeOrm.createdAt = DateTime.getUtcDateTime();
      await transactionRepository.save(transactionTypeOrm);
    } catch (e) {
      console.log(e);
      throw new ConflictException('Error');
    }
    return TransactionCommandMapper.toPerformDepositResponseDto(
      transactionTypeOrm,
    );
  }

  async performWithdraw(
    performWithdraw: PerformWithdraw,
    transactionRepository: Repository<TransactionTypeOrm>,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformWithdrawResponseDto> {
    let transactionTypeOrm: TransactionTypeOrm;
    try {
      let accountTypeOrm: AccountTypeOrm = await accountRepository
        .createQueryBuilder('account')
        .setLock('pessimistic_write')
        .useTransaction(true)
        .where('account.number = :number', {
          number: performWithdraw.accountNumber,
        })
        .getOne();
      let account: BankAccount = AccountCommandMapper.toBankAccount(
        accountTypeOrm,
      );
      account.withdrawMoney(performWithdraw.amount);
      accountTypeOrm.balance = Number(account.getBalance());
      accountTypeOrm.updatedAt = DateTime.getUtcDateTime();
      await accountRepository.save(accountTypeOrm);
      transactionTypeOrm = new TransactionTypeOrm();
      transactionTypeOrm.type = TransactionType.WITHDRAW;
      transactionTypeOrm.fromAccount = accountTypeOrm;
      transactionTypeOrm.toAccount = null;
      transactionTypeOrm.amount = Number(performWithdraw.amount);
      transactionTypeOrm.status = TransactionStatus.COMPLETED;
      transactionTypeOrm.createdAt = DateTime.getUtcDateTime();
      await transactionRepository.save(transactionTypeOrm);
    } catch (e) {
      console.log(e);
      throw new ConflictException('Error');
    }
    return TransactionCommandMapper.toPerformWithdrawResponseDto(
      transactionTypeOrm,
    );
  }

  async performTransfer(
    performTransfer: PerformTransfer,
    transactionRepository: Repository<TransactionTypeOrm>,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<PerformTransferResponseDto> {
    let transactionTypeOrm: TransactionTypeOrm;
    try {
      let fromAccountTypeOrm: AccountTypeOrm = await accountRepository
        .createQueryBuilder('account')
        .setLock('pessimistic_write')
        .useTransaction(true)
        .where('account.number = :number', {
          number: performTransfer.fromAccountNumber,
        })
        .getOne();
      let toAccountTypeOrm: AccountTypeOrm = await accountRepository
        .createQueryBuilder('account')
        .setLock('pessimistic_write')
        .useTransaction(true)
        .where('account.number = :number', {
          number: performTransfer.toAccountNumber,
        })
        .getOne();
      let fromBankAccount: BankAccount = AccountCommandMapper.toBankAccount(
        fromAccountTypeOrm,
      );
      let toBankAccount: BankAccount = AccountCommandMapper.toBankAccount(
        toAccountTypeOrm,
      );
      this.transferDomainService.performTransfer(
        fromBankAccount,
        toBankAccount,
        performTransfer.amount,
      );
      fromAccountTypeOrm.balance = Number(fromBankAccount.getBalance());
      fromAccountTypeOrm.updatedAt = DateTime.getUtcDateTime();
      toAccountTypeOrm.balance = Number(toBankAccount.getBalance());
      toAccountTypeOrm.updatedAt = DateTime.getUtcDateTime();
      await accountRepository.save(fromAccountTypeOrm);
      await accountRepository.save(toAccountTypeOrm);
      transactionTypeOrm = new TransactionTypeOrm();
      transactionTypeOrm.type = TransactionType.TRANSFER;
      transactionTypeOrm.fromAccount = fromAccountTypeOrm;
      transactionTypeOrm.toAccount = toAccountTypeOrm;
      transactionTypeOrm.amount = Number(performTransfer.amount);
      transactionTypeOrm.status = TransactionStatus.COMPLETED;
      transactionTypeOrm.createdAt = DateTime.getUtcDateTime();
      await transactionRepository.save(transactionTypeOrm);
    } catch (e) {
      console.log(e);
      throw new ConflictException('Error');
    }
    return TransactionCommandMapper.toPerformTransferResponseDto(
      transactionTypeOrm,
    );
  }
}
