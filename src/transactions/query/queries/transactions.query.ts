import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionQueryMapper } from '../mappers/transaction.query.mapper';

@Injectable()
export class TransactionsQuery {
  public async getList(): Promise<TransactionDto[]> {
    const manager = getManager();
    const sql = `
    SELECT
      t.transaction_id,
      t.type,
      af.number AS fromAccountNumber,
      at.number AS toAccountNumber,
      t.amount,
      t.status,
      t.created_at
    FROM 
      transaction t
      LEFT JOIN account af ON t.account_id_from = af.account_id
      LEFT JOIN account at ON t.account_id_to = at.account_id
    ORDER BY
      t.created_at DESC;`;
    const ormTransactions: any = await manager.query(sql);
    return TransactionQueryMapper.toDtos(ormTransactions);
  }

  public async getListByAccountId(
    accountId: number,
  ): Promise<TransactionDto[]> {
    const manager = getManager();
    const sql = `
    SELECT
      t.transaction_id,
      t.type,
      af.number AS fromAccountNumber,
      at.number AS toAccountNumber,
      t.amount,
      t.status,
      t.created_at
    FROM 
      transaction t
      LEFT JOIN account af ON t.account_id_from = af.account_id
      LEFT JOIN account at ON t.account_id_to = at.account_id
    WHERE
      af.account_id = ? OR at.account_id = ?
    ORDER BY
      t.created_at DESC;`;
    const ormTransactions: any = await manager.query(sql, [
      accountId,
      accountId,
    ]);
    return TransactionQueryMapper.toDtos(ormTransactions);
  }
}
