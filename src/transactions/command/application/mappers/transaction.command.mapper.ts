import { PerformTransferRequestDto } from '../dto/perform.transfer.request.dto';
import { PerformTransfer } from '../commands/perform.transfer';
import { TransactionStatus } from '../../domain/enums/transaction.status.enum';
import { DateTime } from 'src/app/infra/utils/datetime';
import { TransactionTypeOrm } from '../../infra/persistence/typeorm/entities/transaction.typeorm';
import { PerformTransferResponseDto } from '../dto/perform.transfer.response.dto';
import { PerformDepositRequestDto } from '../dto/perform.deposit.request.dto';
import { PerformDeposit } from '../commands/perform.deposit';
import { PerformDepositResponseDto } from '../dto/perform.deposit.response.dto';
import { PerformWithdraw } from '../commands/perform.withdraw';
import { PerformWithdrawRequestDto } from '../dto/perform.withdraw.request.dto';
import { PerformWithdrawResponseDto } from '../dto/perform.withdraw.response.dto';
import { TransactionTypeLabel } from '../../domain/enums/transaction.type.enum';

export class TransactionCommandMapper {
  public static toPerformDepositCommand(
    performDepositRequestDto: PerformDepositRequestDto,
  ): PerformDeposit {
    let performDeposit: PerformDeposit = new PerformDeposit();
    performDeposit.accountNumber = performDepositRequestDto.accountNumber;
    performDeposit.amount = performDepositRequestDto.amount;
    performDeposit.status = TransactionStatus.COMPLETED;
    performDeposit.createdAt = DateTime.getUtcDateTime();
    return performDeposit;
  }

  public static toPerformDepositResponseDto(
    transactionTypeOrm: TransactionTypeOrm,
  ): PerformDepositResponseDto {
    let performDepositResponseDto: PerformDepositResponseDto = new PerformDepositResponseDto();
    performDepositResponseDto.transactionId = Number(transactionTypeOrm.id);
    performDepositResponseDto.transactionType = TransactionTypeLabel.get(
      transactionTypeOrm.type,
    );
    performDepositResponseDto.accountNumber =
      transactionTypeOrm.toAccount.number;
    performDepositResponseDto.amount = Number(transactionTypeOrm.amount);
    performDepositResponseDto.status =
      TransactionStatus[transactionTypeOrm.status];
    performDepositResponseDto.createdAt = transactionTypeOrm.createdAt;
    return performDepositResponseDto;
  }

  public static toPerformWithdrawCommand(
    performWithdrawRequestDto: PerformWithdrawRequestDto,
  ): PerformWithdraw {
    let performWithdraw: PerformWithdraw = new PerformWithdraw();
    performWithdraw.accountNumber = performWithdrawRequestDto.accountNumber;
    performWithdraw.amount = performWithdrawRequestDto.amount;
    performWithdraw.status = TransactionStatus.COMPLETED;
    performWithdraw.createdAt = DateTime.getUtcDateTime();
    return performWithdraw;
  }

  public static toPerformWithdrawResponseDto(
    transactionTypeOrm: TransactionTypeOrm,
  ): PerformWithdrawResponseDto {
    let performWithdrawResponseDto: PerformWithdrawResponseDto = new PerformWithdrawResponseDto();
    performWithdrawResponseDto.transactionId = Number(transactionTypeOrm.id);
    performWithdrawResponseDto.transactionType = TransactionTypeLabel.get(
      transactionTypeOrm.type,
    );
    performWithdrawResponseDto.accountNumber =
      transactionTypeOrm.fromAccount.number;
    performWithdrawResponseDto.amount = Number(transactionTypeOrm.amount);
    performWithdrawResponseDto.status =
      TransactionStatus[transactionTypeOrm.status];
    performWithdrawResponseDto.createdAt = transactionTypeOrm.createdAt;
    return performWithdrawResponseDto;
  }

  public static toPerformTransferCommand(
    performTransferRequestDto: PerformTransferRequestDto,
  ): PerformTransfer {
    let performTransfer: PerformTransfer = new PerformTransfer();
    performTransfer.fromAccountNumber =
      performTransferRequestDto.fromAccountNumber;
    performTransfer.toAccountNumber = performTransferRequestDto.toAccountNumber;
    performTransfer.amount = performTransferRequestDto.amount;
    performTransfer.status = TransactionStatus.COMPLETED;
    performTransfer.createdAt = DateTime.getUtcDateTime();
    return performTransfer;
  }

  public static toPerformTransferResponseDto(
    transactionTypeOrm: TransactionTypeOrm,
  ): PerformTransferResponseDto {
    let performTransferResponseDto: PerformTransferResponseDto = new PerformTransferResponseDto();
    performTransferResponseDto.transactionId = Number(transactionTypeOrm.id);
    performTransferResponseDto.transactionType = TransactionTypeLabel.get(
      transactionTypeOrm.type,
    );
    performTransferResponseDto.fromAccountNumber =
      transactionTypeOrm.fromAccount.number;
    performTransferResponseDto.toAccountNumber =
      transactionTypeOrm.toAccount.number;
    performTransferResponseDto.amount = Number(transactionTypeOrm.amount);
    performTransferResponseDto.status =
      TransactionStatus[transactionTypeOrm.status];
    performTransferResponseDto.createdAt = transactionTypeOrm.createdAt;
    return performTransferResponseDto;
  }
}
