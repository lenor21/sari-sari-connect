export interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // **Important:** In a real application, you should *never* include the password in your response!  This is a major security vulnerability.
  role: string;
  stores: string[]; // Or possibly ObjectId[] if these are references
  createdAt: string; // Store as string (ISO 8601)
  updatedAt: string; // Store as string (ISO 8601)
  __v: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string; // Or ObjectId
  imgURL: string;
  user: string; // Or ObjectId
  createdAt: string; // Store as string (ISO 8601)
  updatedAt: string; // Store as string (ISO 8601)
  __v: number;
}

export interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

export interface StoreCart {
  store: User; //  Corrected:  'store' is the User type, which contains store info.
  items: Item[];
  _id: string;
}
