import { Injectable } from '@nestjs/common';
import { BankAccount } from 'src/accounts/command/domain/entities/account.entity';
import { AppNotification } from 'src/app/application/notification';

@Injectable()
export class TransferDomainService {
  public performTransfer(
    fromBankAccount: BankAccount,
    toBankAccount: BankAccount,
    amount: number,
  ): void {
    let notification: AppNotification = this.validation(
      fromBankAccount,
      toBankAccount,
      amount,
    );
    if (notification.hasErrors()) {
      throw new Error(notification.errorMessage());
    }
    fromBankAccount.withdrawMoney(amount);
    toBankAccount.depositMoney(amount);
  }

  private validation(
    fromAccount: BankAccount,
    toAccount: BankAccount,
    amount: number,
  ): AppNotification {
    let notification: AppNotification = new AppNotification();
    this.validateAmount(notification, amount);
    this.validateBankAccounts(notification, fromAccount, toAccount);
    return notification;
  }

  private validateAmount(notification: AppNotification, amount: number): void {
    if (amount == null) {
      notification.addError('amount is missing');
      return;
    }
    if (amount <= 0) {
      notification.addError('The amount must be greater than zero');
    }
  }

  private validateBankAccounts(
    notification: AppNotification,
    fromAccount: BankAccount,
    toAccount: BankAccount,
  ): void {
    if (fromAccount == null || toAccount == null) {
      notification.addError(
        'Cannot perform the transfer. Invalid data in bank accounts specifications',
      );
      return;
    }
    if (fromAccount.getNumber() === toAccount.getNumber()) {
      notification.addError('Cannot transfer money to the same bank account');
    }
  }
}
