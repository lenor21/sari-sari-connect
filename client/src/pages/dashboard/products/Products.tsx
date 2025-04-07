import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';

const products = [
  {
    name: 'monay',
    category: 'bread',
    price: '$250.00',
    quantity: '5',
    createdAt: '07/09/2000',
  },
  {
    name: 'monay',
    category: 'bread',
    price: '$250.00',
    quantity: '5',
    createdAt: '07/09/2000',
  },
];

const Products = () => {
  return (
    <div className='bg-white p-4 py-10'>
      <div className='mb-3 flex justify-between flex-col lg:flex-row gap-2'>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <Input
            type='text'
            placeholder='Search'
            className='lg:min-w-[250px]'
          />

          <Select>
            <SelectTrigger className='w-full lg:w-[200px]'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link to='/dashboard/products/add-product'>
          <Button>
            <Plus />
            Add Product
          </Button>
        </Link>
      </div>

      <Table>
        <TableCaption>A list of all your store products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className='w-[200px]'>Category</TableHead>
            <TableHead className='w-[200px]'>Price</TableHead>
            <TableHead className='w-[100px]'>Quantity</TableHead>
            <TableHead className='text-right w-[200px]'>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className='text-right'>{product.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
