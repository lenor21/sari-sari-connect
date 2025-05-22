import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item } from '@/types/cart/cartTypes';

interface CartItemProps {
  item: Item;
  storeId: string;
  productId: string;
  handleIncrement: (
    productId: string,
    storeId: string,
    itemCount: number
  ) => void;
  handleDecrement: (
    productId: string,
    storeId: string,
    itemCount: number
  ) => void;
  handleQuantityChange: (
    productId: string,
    storeId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleIncrement,
  handleDecrement,
  handleQuantityChange,
  storeId,
  productId,
}) => {
  return (
    <li
      key={item._id}
      className='grid grid-cols-2 lg:grid-cols-8 gap-4 py-5 lg:py-10 lg:px-5 border border-y-1 border-x-0'>
      <div className='h-16 w-16'>
        <img
          src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className='h-full object-cover'
        />
      </div>
      <div className='lg:col-span-4'>
        <p className='text-2xl'>{item.product.name}</p>
        <p className='text-[#737373]'>₱{item.product.price.toFixed(2)}</p>
      </div>
      <div className='flex items-center gap-2 col-span-3 lg:col-span-2'>
        <Button
          variant='outline'
          onClick={() => handleDecrement(productId, storeId, item.quantity)}>
          -
        </Button>
        <Input
          type='number'
          value={item.quantity}
          className='min-w-13 px-2'
          onChange={(e) => handleQuantityChange(productId, storeId, e)}
        />
        <Button
          variant='outline'
          onClick={() => handleIncrement(productId, storeId, item.quantity)}>
          +
        </Button>
      </div>
      <p className='grid place-items-center col-span-1 lg:col-span-1'>
        ₱
        {(item.product.price * item.quantity).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </li>
  );
};

export default CartItem;
