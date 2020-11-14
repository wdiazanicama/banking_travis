export class TransactionDto {
  public transactionId: number;
  public transactionType: string;
  public fromAccountNumber: string;
  public toAccountNumber: string;
  public amount: number;
  public status: string;
  public createdAt: string;
}
