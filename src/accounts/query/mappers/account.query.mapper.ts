import { AccountDto } from '../dto/account.dto';

export class AccountQueryMapper {
  public static toDtos(ormAccounts: []): AccountDto[] {
    return ormAccounts.map((ormAccount) => this.toDto(ormAccount));
  }

  public static toDto(ormAccount: any): AccountDto {
    const accountDto: AccountDto = new AccountDto();
    accountDto.id = parseInt(ormAccount.account_id, 10);
    accountDto.number = ormAccount.number;
    accountDto.balance = ormAccount.balance;
    accountDto.isLocked = Boolean(ormAccount.is_locked).valueOf();
    accountDto.customerId = parseInt(ormAccount.customer_id, 10);
    accountDto.createdAt = ormAccount.created_at;
    accountDto.updatedAt = ormAccount.updated_at;
    return accountDto;
  }

  public static toEmpty(): AccountDto {
    const accountDto: AccountDto = new AccountDto();
    accountDto.id = null;
    accountDto.number = null;
    accountDto.balance = null;
    accountDto.isLocked = false;
    accountDto.customerId = null;
    accountDto.createdAt = null;
    accountDto.updatedAt = null;
    return accountDto;
  }
}
