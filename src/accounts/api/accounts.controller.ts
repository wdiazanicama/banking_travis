import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { OpenAccount } from '../command/application/commands/open.account';
import { LockAccountResponseDto } from '../command/application/dto/lock.account.response.dto';
import { OpenAccountRequestDto } from '../command/application/dto/open.account.request.dto';
import { OpenAccountResponseDto } from '../command/application/dto/open.account.response.dto';
import { AccountCommandMapper } from '../command/application/mappers/account.command.mapper';
import { AccountsService } from '../command/application/service/accounts.service';
import { AccountTypeOrm } from '../command/infra/persistence/typeorm/entities/account.typeorm';
import { AccountDto } from '../query/dto/account.dto';
import { AccountsQuery } from '../query/queries/accounts.query';

@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsCommand: AccountsService,
    private accountsQuery: AccountsQuery,
  ) {}

  @Post('')
  @Transaction()
  open(
    @Body() openAccountRequestDto: OpenAccountRequestDto,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<OpenAccountResponseDto> {
    const openAccount: OpenAccount = AccountCommandMapper.toOpenAccountCommand(
      openAccountRequestDto,
    );
    return this.accountsCommand.openAccount(openAccount, accountRepository);
  }

  @Patch('/:id/lock')
  @Transaction()
  async lock(
    @Param('id') accountId: number,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<LockAccountResponseDto> {
    const accountDto: LockAccountResponseDto = await this.accountsCommand.lock(
      accountId,
      accountRepository,
    );
    if (accountDto.id === null) {
      throw new NotFoundException('Not found');
    }
    return accountDto;
  }

  @Patch('/:id/unlock')
  @Transaction()
  async unlock(
    @Param('id') accountId: number,
    @TransactionRepository(AccountTypeOrm)
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<LockAccountResponseDto> {
    const accountDto: LockAccountResponseDto = await this.accountsCommand.unlock(
      accountId,
      accountRepository,
    );
    if (accountDto.id === null) {
      throw new NotFoundException('Not found');
    }
    return accountDto;
  }

  @Get()
  getList(): Promise<AccountDto[]> {
    return this.accountsQuery.getList();
  }

  @Get('/:id')
  async getById(@Param('id') accountId: number): Promise<AccountDto> {
    const accountDto: AccountDto = await this.accountsQuery.getById(accountId);
    if (accountDto.id === null) {
      throw new NotFoundException('Not found');
    }
    return accountDto;
  }
}
