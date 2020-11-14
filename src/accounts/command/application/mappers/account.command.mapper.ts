import { CustomerCommandMapper } from 'src/customers/command/application/mappers/customer.command.mapper';
import { BankAccount } from '../../domain/entities/account.entity';
import { AccountTypeOrm } from '../../infra/persistence/typeorm/entities/account.typeorm';
import { OpenAccount } from '../commands/open.account';
import { LockAccountResponseDto } from '../dto/lock.account.response.dto';
import { OpenAccountRequestDto } from '../dto/open.account.request.dto';
import { OpenAccountResponseDto } from '../dto/open.account.response.dto';
import { UnlockAccountResponseDto } from '../dto/unlock.account.response.dto';

export class AccountCommandMapper {
  public static toOpenAccountCommand(
    openAccountRequestDto: OpenAccountRequestDto,
  ): OpenAccount {
    let openAccount: OpenAccount = new OpenAccount();
    openAccount.customerId = openAccountRequestDto.customerId;
    openAccount.isLocked = false;
    openAccount.balance = 0;
    return openAccount;
  }

  public static toOpenAccountResponseDto(
    accountTypeOrm: AccountTypeOrm,
  ): OpenAccountResponseDto {
    let openAccountResponseDto: OpenAccountResponseDto = new OpenAccountResponseDto();
    openAccountResponseDto.accountId = Number(accountTypeOrm.id);
    openAccountResponseDto.number = accountTypeOrm.number;
    openAccountResponseDto.balance = accountTypeOrm.balance;
    openAccountResponseDto.isLocked = Boolean(accountTypeOrm.isLocked);
    openAccountResponseDto.createdAt = accountTypeOrm.createdAt;
    return openAccountResponseDto;
  }

  public static toBankAccount(accountTypeOrm: AccountTypeOrm): BankAccount {
    const bankAccount: BankAccount = BankAccount.from(
      accountTypeOrm.id,
      accountTypeOrm.number,
      accountTypeOrm.balance,
      accountTypeOrm.isLocked,
      CustomerCommandMapper.toCustomerWithId(accountTypeOrm.customerId),
      accountTypeOrm.createdAt,
      accountTypeOrm.updatedAt,
    );
    return bankAccount;
  }

  public static toAccountTypeOrm(bankAccount: BankAccount): AccountTypeOrm {
    let accountTypeOrm: AccountTypeOrm = new AccountTypeOrm();
    accountTypeOrm.id = Number(bankAccount.getId());
    accountTypeOrm.number = bankAccount.getNumber();
    accountTypeOrm.balance = Number(bankAccount.getBalance());
    accountTypeOrm.isLocked = bankAccount.isIsLocked();
    (accountTypeOrm.customer = CustomerCommandMapper.toCustomerTypeOrmWithId(
      bankAccount.getCustomer().getId(),
    )),
      (accountTypeOrm.createdAt = bankAccount.getCreatedAt());
    accountTypeOrm.updatedAt = bankAccount.getUpdatedAt();
    return accountTypeOrm;
  }

  public static toLockAccountResponseDto(
    accountTypeOrm: AccountTypeOrm,
  ): LockAccountResponseDto {
    let lockAccountResponseDto: LockAccountResponseDto = new LockAccountResponseDto();
    lockAccountResponseDto.id = Number(accountTypeOrm.id);
    lockAccountResponseDto.number = accountTypeOrm.number;
    lockAccountResponseDto.balance = accountTypeOrm.balance;
    lockAccountResponseDto.isLocked = Boolean(
      accountTypeOrm.isLocked,
    ).valueOf();
    lockAccountResponseDto.customerId = Number(accountTypeOrm.customerId);
    lockAccountResponseDto.createdAt = accountTypeOrm.createdAt;
    lockAccountResponseDto.updatedAt = accountTypeOrm.updatedAt;
    return lockAccountResponseDto;
  }

  public static toEmptyLockAccountResponseDto(): LockAccountResponseDto {
    let lockAccountResponseDto: LockAccountResponseDto = new LockAccountResponseDto();
    lockAccountResponseDto.id = null;
    lockAccountResponseDto.number = null;
    lockAccountResponseDto.balance = null;
    lockAccountResponseDto.isLocked = null;
    lockAccountResponseDto.customerId = null;
    lockAccountResponseDto.createdAt = null;
    lockAccountResponseDto.updatedAt = null;
    return lockAccountResponseDto;
  }

  public static toUnlockAccountResponseDto(
    accountTypeOrm: AccountTypeOrm,
  ): UnlockAccountResponseDto {
    let unlockAccountResponseDto: UnlockAccountResponseDto = new UnlockAccountResponseDto();
    unlockAccountResponseDto.id = Number(accountTypeOrm.id);
    unlockAccountResponseDto.number = accountTypeOrm.number;
    unlockAccountResponseDto.balance = accountTypeOrm.balance;
    unlockAccountResponseDto.isLocked = Boolean(
      accountTypeOrm.isLocked,
    ).valueOf();
    unlockAccountResponseDto.customerId = Number(accountTypeOrm.customerId);
    unlockAccountResponseDto.createdAt = accountTypeOrm.createdAt;
    unlockAccountResponseDto.updatedAt = accountTypeOrm.updatedAt;
    return unlockAccountResponseDto;
  }

  public static toEmptyUnlockAccountResponseDto(): UnlockAccountResponseDto {
    let unlockAccountResponseDto: UnlockAccountResponseDto = new UnlockAccountResponseDto();
    unlockAccountResponseDto.id = null;
    unlockAccountResponseDto.number = null;
    unlockAccountResponseDto.balance = null;
    unlockAccountResponseDto.isLocked = null;
    unlockAccountResponseDto.customerId = null;
    unlockAccountResponseDto.createdAt = null;
    unlockAccountResponseDto.updatedAt = null;
    return unlockAccountResponseDto;
  }
}
