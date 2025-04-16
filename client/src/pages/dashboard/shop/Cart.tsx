import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { useGetCartQuery } from '@/features/product/cartApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useState, useEffect } from 'react';

interface User {
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

interface Product {
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

interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

interface StoreCart {
  store: User; //  Corrected:  'store' is the User type, which contains store info.
  items: Item[];
  _id: string;
}

interface Cart {
  _id: string;
  user: string; // Or ObjectId
  stores: StoreCart[];
  createdAt: string; // Store as string (ISO 8601)
  updatedAt: string; // Store as string (ISO 8601)
  __v: number;
}

const Cart = () => {
  const [cartData, setCartData] = useState<Cart>();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: cartDataRaw } = useGetCartQuery(userInfo._id);

  useEffect(() => {
    if (cartDataRaw) {
      setCartData(cartDataRaw);
    }
  }, [cartDataRaw]);

  if (cartData) {
    console.log(cartData.stores);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-10 lg:gap-15'>
          {cartData &&
            cartData.stores.map((storeCart) => (
              <div key={storeCart._id}>
                <h2 className='mb-2 font-bold text-xl lg:text-2xl'>
                  {storeCart.store.name}
                </h2>
                <ul key={storeCart._id} className='lg:px-4'>
                  {storeCart.items &&
                    storeCart.items.map((item) => (
                      <li
                        key={item._id}
                        className='grid grid-cols-2 lg:grid-cols-6 gap-4 py-5 lg:py-10 lg:px-5 border border-y-1 border-x-0'>
                        <div className='h-16 w-16'>
                          <img
                            src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt=''
                            className='h-full object-cover'
                          />
                        </div>
                        <div className='lg:col-span-3'>
                          <p className='text-2xl'>{item.product.name}</p>
                          <p className='text-[#737373]'>
                            ₱{item.product.price}
                          </p>
                        </div>
                        <div className='flex items-center gap-2 col-span-2 lg:col-span-1'>
                          <Button variant='outline'>-</Button>
                          <Input
                            type='number'
                            value={item.quantity}
                            className='min-w-10'
                          />
                          <Button variant='outline'>+</Button>
                        </div>
                        <p className='grid place-items-center col-span-2 lg:col-span-1'>
                          ₱123
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-4 mt-10'>
          <p>Subtotal:</p>
          <div className='flex gap-2 lg:gap-4 flex-col lg:flex-row w-full'>
            <Button className='w-full lg:w-52'>Checkout</Button>
            <Button variant='outline' className='w-full lg:w-52'>
              <Link to='/'>Continue Shopping</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
