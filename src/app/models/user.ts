export class User {
  public firstName: string;
  public lastName: string;
  public contactNumber: number;
  public email: string;
  public dob: Date;
  public address: Address;
}

export class Address {
  public street: string;
  public pin: number;
  public state: string;
}
