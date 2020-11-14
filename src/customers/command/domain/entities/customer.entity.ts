export class Customer {
  private id: number;
  private firstName: string;
  private lastName: string;
  private isActive: boolean;
  private createdAt: string;
  private updatedAt: string;

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = Number(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static withId(id: number): Customer {
    return new Customer(id, '', '', true, '', '');
  }

  public getId(): number {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public isIsActive(): boolean {
    return this.isActive;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
}
