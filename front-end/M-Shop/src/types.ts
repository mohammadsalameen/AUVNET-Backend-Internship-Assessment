export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
  }  

export interface LoginPayload {
    email: string;
    password: string;
}

export interface DecodedToken {
    id: string;
    userName: string;
    role: string;
    iat?: number;
    exp?: number;
  }
  
  export interface AuthContextType {
    user: UserPayload | null;
    login: (token: string) => void;
    logout: () => void;
    loading : boolean; 
  }

export interface UserPayload {
    id: string;
    userName: string;
    role: string;
  }  

export interface Category {
    _id: string;
    name: string;
    slug: string;
    status: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    discount: number;
    createdBy: string;
    priceAfterDiscount: number;
    mainImage: {
      secure_url: string;
    };
}
