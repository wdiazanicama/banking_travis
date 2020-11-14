import { Customer } from 'src/customers/command/domain/entities/customer.entity';
import { AppNotification } from 'src/app/application/notification';

export class BankAccount {
  private id: number;
  private number: string;
  private balance: number;
  private isLocked: boolean;
  private customer: Customer;
  private createdAt: string;
  private updatedAt: string;

  private constructor(
    id: number,
    number: string,
    balance: number,
    isLocked: boolean,
    customer: Customer,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = Number(id);
    this.number = number;
    this.balance = Number(balance);
    this.isLocked = isLocked;
    this.customer = customer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static from(
    id: number,
    number: string,
    balance: number,
    isLocked: boolean,
    customer: Customer,
    createdAt: string,
    updatedAt: string,
  ): BankAccount {
    return new BankAccount(
      id,
      number,
      balance,
      isLocked,
      customer,
      createdAt,
      updatedAt,
    );
  }

  public depositMoney(amount: number): void {
    let notification: AppNotification = this.depositValidation(amount);
    if (notification.hasErrors()) {
      throw new Error(notification.errorMessage());
    }
    this.balance = this.balance + amount;
  }

  public depositValidation(amount: number): AppNotification {
    let notification: AppNotification = new AppNotification();
    this.validateAmount(notification, amount);
    this.validateBankAccount(notification);
    return notification;
  }

  public withdrawMoney(amount: number): void {
    let notification: AppNotification = this.withdrawValidation(amount);
    if (notification.hasErrors()) {
      throw new Error(notification.errorMessage());
    }
    this.balance = this.balance - amount;
  }

  public withdrawValidation(amount: number): AppNotification {
    let notification: AppNotification = new AppNotification();
    this.validateAmount(notification, amount);
    this.validateBankAccount(notification);
    this.validateBalance(notification, amount);
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

  private validateBankAccount(notification: AppNotification): void {
    if (!this.hasIdentity()) {
      notification.addError('The account has no identity');
    }
    if (this.isLocked) {
      notification.addError('The account is locked');
    }
  }

  private validateBalance(notification: AppNotification, amount: number): void {
    if (this.balance == null) {
      notification.addError('balance cannot be null');
    }
    if (!this.canBeWithdrawed(amount)) {
      notification.addError(
        'Cannot withdraw in the account, amount is greater than balance',
      );
    }
  }

  public canBeWithdrawed(amount: number): boolean {
    return !this.isLocked && this.balance >= amount;
  }

  public doesNotExist(): boolean {
    return this.id === null || this.id <= 0;
  }

  public exist(): boolean {
    return this.id != null && this.id > 0;
  }

  public lock(): void {
    if (!this.isLocked) {
      this.isLocked = true;
    }
  }

  public unLock(): void {
    if (this.isLocked) {
      this.isLocked = false;
    }
  }

  public hasIdentity(): boolean {
    return this.number.trim().length > 0;
  }

  public getId(): number {
    return this.id;
  }

  public getNumber(): string {
    return this.number;
  }

  public getBalance(): number {
    return this.balance;
  }

  public isIsLocked(): boolean {
    return this.isLocked;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
}
