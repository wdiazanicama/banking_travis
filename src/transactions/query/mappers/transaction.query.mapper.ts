import { TransactionStatus } from 'src/transactions/command/domain/enums/transaction.status.enum';
import { TransactionTypeLabel } from 'src/transactions/command/domain/enums/transaction.type.enum';
import { TransactionDto } from '../dto/transaction.dto';

export class TransactionQueryMapper {
  public static toDtos(ormTransactions: []): TransactionDto[] {
    return ormTransactions.map((ormTransaction) => this.toDto(ormTransaction));
  }

  public static toDto(ormTransaction: any): TransactionDto {
    const transactionDto: TransactionDto = new TransactionDto();
    transactionDto.transactionId = Number(ormTransaction.transaction_id);
    transactionDto.transactionType = TransactionTypeLabel.get(
      ormTransaction.type,
    );
    transactionDto.fromAccountNumber = ormTransaction.fromAccountNumber;
    transactionDto.toAccountNumber = ormTransaction.toAccountNumber;
    transactionDto.amount = Number(ormTransaction.amount);
    transactionDto.status = TransactionStatus[Number(ormTransaction.status)];
    transactionDto.createdAt = ormTransaction.created_at;
    return transactionDto;
  }
}
