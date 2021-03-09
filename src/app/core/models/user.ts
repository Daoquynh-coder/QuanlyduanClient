export class User {
  name: string;
  username: string;
  password: number;
}

export interface ResetPassword {
  phone_email: string,
  new_password: string,
  confirm_password: string;
}
