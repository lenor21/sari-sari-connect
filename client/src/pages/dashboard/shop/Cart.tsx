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
import { StoreCart } from '@/types/cart/cartTypes';

export interface Cart {
  _id: string;
  user: string; // Or ObjectId
  stores: StoreCart[];
  createdAt: string; // Store as string (ISO 8601)
  updatedAt: string; // Store as string (ISO 8601)
  __v: number;
}

const Cart = () => {
  const [cartData, setCartData] = useState<Cart | undefined>();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: cartDataRaw } = useGetCartQuery(userInfo._id);

  useEffect(() => {
    if (cartDataRaw) {
      setCartData(cartDataRaw);
    }
  }, [cartDataRaw]);

  if (!cartData || !cartData.stores || cartData.stores.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your cart is empty.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to='/dashboard/shop'>Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  let totalPrice: number;

  if (cartData) {
    // Calculate total price
    totalPrice = cartData.stores.reduce((total, storeCart) => {
      return (
        total +
        storeCart.items.reduce((storeTotal, item) => {
          return storeTotal + item.product.price * item.quantity;
        }, 0)
      );
    }, 0);
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
                            ₱{item.product.price.toFixed(2)}
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
                          ₱{totalPrice.toFixed(2)}
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
              <Link to='/dashboard/shop'>Continue Shopping</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
