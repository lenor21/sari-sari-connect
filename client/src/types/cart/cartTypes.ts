export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  stores: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imgURL: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

export interface StoreCart {
  store: User;
  items: Item[];
  _id: string;
}
