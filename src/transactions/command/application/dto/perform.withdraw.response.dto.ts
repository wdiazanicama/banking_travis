export class PerformWithdrawResponseDto {
  public transactionId: number;
  public transactionType: string;
  public accountNumber: string;
  public amount: number;
  public status: string;
  public createdAt: string;
}
