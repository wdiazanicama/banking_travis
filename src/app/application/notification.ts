import { AppError } from './error';

export class AppNotification {
  private errors: AppError[] = [];

  constructor() {}

  public addError(message: string): void {
    this.errors.push(new AppError(message));
  }

  public errorMessage(separator = '<br/>'): string {
    return this.errors
      .map(function (appError) {
        return appError.getMessage();
      })
      .join(separator);
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
