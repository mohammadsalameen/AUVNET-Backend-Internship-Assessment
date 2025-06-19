export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
  }  

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UserPayload {
    id: string;
    userName: string;
    role: string;
  }  