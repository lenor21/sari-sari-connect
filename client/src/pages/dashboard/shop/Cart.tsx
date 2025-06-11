import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  useGetCartQuery,
  useRemoveItemMutation,
  useUpdateQuantityMutation,
} from '@/features/cart/cartApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useState, useEffect } from 'react';
import { StoreCart } from '@/types/cart/cartTypes';
import CartItem from '@/components/custom/cart-item';
import { Store } from 'lucide-react';
import { addTotal } from '@/features/cart/cartSlice';

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
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: cartDataRaw } = useGetCartQuery(userInfo._id);
  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeItem] = useRemoveItemMutation();

  useEffect(() => {
    if (cartDataRaw) {
      setCartData(cartDataRaw);
    }
  }, [cartDataRaw]);

  useEffect(() => {
    let calculatedSubtotal = 0;

    if (cartData && cartData.stores) {
      for (const storeEntry of cartData.stores) {
        if (storeEntry.items) {
          for (const item of storeEntry.items) {
            if (item.product && typeof item.product.price === 'number') {
              calculatedSubtotal += item.product.price * item.quantity;
            } else {
              console.warn(
                `Product ID ${
                  item.product ? item.product._id : 'N/A'
                } or its price is missing/invalid for an item in the cart.`
              );
            }
          }
        }
      }
    }

    setSubTotal(calculatedSubtotal);
  }, [cartData]);

  useEffect(() => {
    let calculatedTotalItems = 0;

    if (cartData && cartData.stores) {
      for (const storeEntry of cartData.stores) {
        if (storeEntry.items) {
          for (const item of storeEntry.items) {
            calculatedTotalItems += item.quantity;
          }
        }
      }
    }

    dispatch(addTotal(calculatedTotalItems));
    setTotalItems(calculatedTotalItems);
  }, [cartData]);

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

  const handleQuantityChange = async (
    productId: string,
    storeId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newQuantity = parseInt(e.target.value, 10);

    await updateQuantity({
      item: productId,
      store: storeId,
      quantity: newQuantity,
    }).unwrap();
  };

  const handleIncrement = async (
    productId: string,
    storeId: string,
    quantity: number
  ) => {
    let add: number = quantity + 1;

    await updateQuantity({
      item: productId,
      store: storeId,
      quantity: add,
    }).unwrap();
  };

  const handleDecrement = async (
    productId: string,
    storeId: string,
    quantity: number
  ) => {
    if (quantity < 2) {
      await removeItem({
        item: productId,
        store: storeId,
      }).unwrap();
    } else {
      let sub: number = quantity - 1;

      await updateQuantity({
        item: productId,
        store: storeId,
        quantity: sub,
      }).unwrap();
    }
  };

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
                <h2 className='mb-2 font-bold text-xl lg:text-2xl flex items-center gap-x-2'>
                  <Store />
                  {storeCart.store.name}
                </h2>
                <ul key={storeCart._id} className='lg:px-4'>
                  {storeCart.items &&
                    storeCart.items.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleQuantityChange={handleQuantityChange}
                        storeId={storeCart._id}
                        productId={item._id}
                      />
                    ))}
                </ul>
              </div>
            ))}
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-4 mt-10'>
          <p>Total items: {totalItems}</p>
          <p>Subtotal: ₱{subTotal.toFixed(2)}</p>
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
