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
import { useGetProductsQuery } from '@/features/product/productsApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@/features/product/categoryApiSlice';

interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  price: number;
  quantity: number;
  createdAt: Date;
}

interface Category {
  _id: string;
  name: string;
}

const Products = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: productsDataRaw } = useGetProductsQuery(userInfo._id);
  const { data: categoriesDataRaw } = useGetCategoriesQuery(userInfo?._id);

  useEffect(() => {
    if (productsDataRaw) {
      // Convert createdAt string to Date object
      const processedProducts = productsDataRaw.map((product: Product) => {
        return {
          ...product,
          createdAt: new Date(product.createdAt),
        };
      });

      setProductsData(processedProducts);
    }
  }, [productsDataRaw]);

  useEffect(() => {
    if (categoriesDataRaw) {
      const processedCategories = categoriesDataRaw.map(
        (category: Category) => {
          return {
            ...category,
          };
        }
      );

      setCategoriesData(processedCategories);
    }
  }, [categoriesDataRaw]);

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
              {categoriesData.map((category: Category) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </SelectItem>
              ))}
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
          {productsData.map((product) => (
            <TableRow key={product._id}>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className='text-right'>
                {product.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
