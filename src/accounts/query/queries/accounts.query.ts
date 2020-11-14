import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { AccountDto } from '../dto/account.dto';
import { AccountQueryMapper } from '../mappers/account.query.mapper';

@Injectable()
export class AccountsQuery {
  public async getById(accountId: number): Promise<AccountDto> {
    const manager = getManager();
    const sql = `
    SELECT
      a.account_id,
      a.number,
      a.balance,
      a.is_locked,
      a.customer_id,
      a.created_at,
      a.updated_at
    FROM 
      account a
    WHERE
      a.account_id = ?
    ORDER BY
      a.created_at DESC, a.account_id DESC;`;
    const ormAccount: Array<any> = await manager.query(sql, [accountId]);
    return ormAccount.length > 0
      ? AccountQueryMapper.toDto(ormAccount[0])
      : AccountQueryMapper.toEmpty();
  }

  public async getList(): Promise<AccountDto[]> {
    const manager = getManager();
    const sql = `
    SELECT 
      a.account_id,
      a.number,
      a.balance,
      a.is_locked,
      a.customer_id,
      c.first_name,
      c.last_name,
      a.created_at,
      a.updated_at
    FROM 
      account a
      JOIN customer c ON a.customer_id = c.customer_id
    ORDER BY
      a.created_at DESC, a.account_id DESC;`;
    const ormAccounts: any = await manager.query(sql);
    return AccountQueryMapper.toDtos(ormAccounts);
  }
}
