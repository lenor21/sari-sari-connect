import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch } from 'react-redux';
import { addItem } from '@/features/product/cartSlice';
import { useState } from 'react';

const ShopProductCard = ({ ...product }) => {
  const [quantity, setQuantity] = useState(1);

  const options = [];

  const dispatch = useDispatch();

  for (let i = 1; i <= product.quantity; i++) {
    options.push(
      <SelectItem key={i} value={String(i)}>
        {i}
      </SelectItem>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      product: { ...product, createdAt: product.createdAt.toISOString() },
      quantity: quantity,
    };
    dispatch(addItem(cartItem));

    console.log(cartItem);
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value, 10));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='rounded-lg shadow-lg border border-[#eee] overflow-hidden group cursor-pointer'>
          <div className='w-full overflow-hidden'>
            <img
              src='https://media.istockphoto.com/id/157587362/photo/detailed-close-up-of-sliced-grain-bread-on-white-background.jpg?s=2048x2048&w=is&k=20&c=ut6-wCXQie85gZXY2yXR0aGgNcVqF7u9qUgWOjkgCLs='
              alt='profile'
              className='w-full object-cover group-hover:scale-[1.2] transition-all'
            />
          </div>
          <div className='p-3 group-hover:opacity-50 transition-all'>
            <p className='text-sm lg:text-xl font-medium line-clamp-1'>
              {product.name}
            </p>
            <p className='text-sm text-[#737373] line-clamp-2'>
              ₱{product.price}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='font-extrabold text-3xl'>
            {product.name}
          </DialogTitle>
          <DialogDescription>₱{product.price}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <p>QTY</p>
            <Select
              onValueChange={handleQuantityChange}
              value={String(quantity)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a quantity' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{options}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShopProductCard;
