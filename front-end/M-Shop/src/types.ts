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
    priceAfterDiscount: number;
    _id: string;
    name: string;
    price: number;
    discount: number;
    mainImage: {
      secure_url: string;
      public_id: string;
    };
    categoryId?: {
      _id: string;
      name: string;
    };
    createdBy?: string | {
      _id: string;
      username: string;
    };
  }
  

export interface ApiResponse {
    products: Product[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination?: any;
    userRole?: string;
  }

  export interface WishlistItem {
    productId: string;
  }
  
  export interface Wishlist {
    _id: string;
    userId: string;
    products: WishlistItem[];
  }
  