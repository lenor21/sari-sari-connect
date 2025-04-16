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
import { useAddCartMutation } from '@/features/product/cartApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface ShopProductCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  id: string;
  [key: string]: any;
}

const ShopProductCard: React.FC<ShopProductCardProps> = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [addCart] = useAddCartMutation();

  const navigate = useNavigate();

  const options = [];

  for (let i = 1; i <= props.quantity; i++) {
    options.push(
      <SelectItem key={i} value={String(i)}>
        {i}
      </SelectItem>
    );
  }

  const handleAddToCart = async () => {
    await addCart({
      product: props._id,
      quantity: quantity,
      store: props.id,
    }).unwrap();

    setIsDialogOpen(false);
    navigate('/dashboard/cart');
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value, 10));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              {props.name}
            </p>
            <p className='text-sm text-[#737373] line-clamp-2'>
              ₱{props.price.toFixed(2)}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='font-extrabold text-3xl'>
            {props.name}
          </DialogTitle>
          <DialogDescription>₱{props.price.toFixed(2)}</DialogDescription>
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
