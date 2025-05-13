export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: string;
}

export interface SelfUser {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface UpdatedUser {
  id: string;
  name: string | null;
  password: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface RegisteredUser {
  username: string;
  name: string;
  password: string;
  email: string;
  phoneNumber: string | null;
}

export interface CreatedUser {
  registeredUser: RegisteredUser;
  role: string;
}