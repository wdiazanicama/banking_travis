import { ConflictException, Injectable } from '@nestjs/common';
import { DateTime } from 'src/app/infra/utils/datetime';
import { Repository } from 'typeorm';
import { AccountTypeOrm } from '../../infra/persistence/typeorm/entities/account.typeorm';
import { OpenAccount } from '../commands/open.account';
import { LockAccountResponseDto } from '../dto/lock.account.response.dto';
import { OpenAccountResponseDto } from '../dto/open.account.response.dto';
import { AccountCommandMapper } from '../mappers/account.command.mapper';

@Injectable()
export class AccountsService {
  constructor() {}

  async openAccount(
    openAccount: OpenAccount,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<OpenAccountResponseDto> {
    let accountTypeOrm: AccountTypeOrm;
    try {
      let { max } = await accountRepository
        .createQueryBuilder('account')
        .setLock('pessimistic_read')
        .useTransaction(true)
        .select('MAX(account.number)', 'max')
        .getRawOne();
      max = max != null ? Number(max) + 1 : 1;
      let accountNumber = max.toString();
      const maxLength = 10;
      accountNumber = accountNumber.padStart(maxLength, '0');
      const nowUtc = DateTime.getUtcDateTime();
      accountTypeOrm = new AccountTypeOrm();
      accountTypeOrm.balance = openAccount.balance;
      accountTypeOrm.customerId = openAccount.customerId;
      accountTypeOrm.isLocked = openAccount.isLocked;
      accountTypeOrm.number = accountNumber;
      accountTypeOrm.createdAt = nowUtc;
      accountTypeOrm.updatedAt = nowUtc;
      await accountRepository.save(accountTypeOrm);
    } catch (e) {
      console.log(e);
      throw new ConflictException('Error');
    }
    return AccountCommandMapper.toOpenAccountResponseDto(accountTypeOrm);
  }

  async lock(
    accountId: number,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<LockAccountResponseDto> {
    let responseDto: LockAccountResponseDto;
    let accountTypeOrm: AccountTypeOrm;
    try {
      const accountTypeOrm = await accountRepository.findOne({
        id: accountId,
      });
      if (accountTypeOrm === null || accountTypeOrm === undefined) {
        return AccountCommandMapper.toEmptyLockAccountResponseDto();
      }
      const nowUtc = DateTime.getUtcDateTime();
      accountTypeOrm.isLocked = true;
      accountTypeOrm.updatedAt = nowUtc;
      await accountRepository.save(accountTypeOrm);
      responseDto = AccountCommandMapper.toLockAccountResponseDto(
        accountTypeOrm,
      );
    } catch (e) {
      console.log(e);
      throw new ConflictException(accountTypeOrm);
    }
    return responseDto;
  }

  async unlock(
    accountId: number,
    accountRepository: Repository<AccountTypeOrm>,
  ): Promise<LockAccountResponseDto> {
    let responseDto: LockAccountResponseDto;
    let accountTypeOrm: AccountTypeOrm;
    try {
      const accountTypeOrm = await accountRepository.findOne({
        id: accountId,
      });
      if (accountTypeOrm === null || accountTypeOrm === undefined) {
        return AccountCommandMapper.toEmptyUnlockAccountResponseDto();
      }
      const nowUtc = DateTime.getUtcDateTime();
      accountTypeOrm.isLocked = false;
      accountTypeOrm.updatedAt = nowUtc;
      await accountRepository.save(accountTypeOrm);
      responseDto = AccountCommandMapper.toUnlockAccountResponseDto(
        accountTypeOrm,
      );
    } catch (e) {
      console.log(e);
      throw new ConflictException(accountTypeOrm);
    }
    return responseDto;
  }
}
