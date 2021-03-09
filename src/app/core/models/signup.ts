export interface Signup {
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  gender: string | any;
  tax_number: string;
  role_id: number;
  end_user_role: number;
  type: string | any;
  mobile?: string;
  invitation_code?: string;
}

export interface InsertDataSignupSuccess {
  email: string;
  password: string;
  status: boolean;
}
