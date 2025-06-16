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
import { Plus, Trash, Pencil } from 'lucide-react';
import { Link } from 'react-router';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/features/product/productsApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@/features/product/categoryApiSlice';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Swal from 'sweetalert2';
import { supabase } from '@/lib/supaBaseProfileClient';
import { getFilePathFromSupabaseUrl } from '@/helpers/getFilePathFromSupabaseUrl';

interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  price: number;
  quantity: number;
  createdAt: Date;
  imgURL: string;
}

interface Category {
  _id: string;
  name: string;
}

const Products = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: productsDataRaw, isLoading } = useGetProductsQuery(
    userInfo._id
  );
  const { data: categoriesDataRaw } = useGetCategoriesQuery(userInfo?._id);
  const [deleteProduct] = useDeleteProductMutation();

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

  const bucketName = 'sari-sari-connect';

  const handleDelete = async (
    categoryId: string,
    productImageURL: string | null | undefined
  ) => {
    try {
      Swal.fire({
        color: '#0a0a0a',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0a0a0a',
        cancelButtonColor: '#ddd',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProduct(categoryId).unwrap();

          if (productImageURL) {
            const filePathToDelete = getFilePathFromSupabaseUrl(
              productImageURL,
              bucketName
            ); // Assuming bucketName is defined

            if (filePathToDelete) {
              try {
                const { error: deleteStorageError } = await supabase.storage
                  .from(bucketName)
                  .remove([filePathToDelete]);

                if (deleteStorageError) {
                  // Log this as a warning, as the product is deleted, but image cleanup failed
                  console.warn(
                    'Warning: Error deleting image from Supabase Storage:',
                    deleteStorageError.message
                  );
                  Swal.fire({
                    color: '#0a0a0a',
                    position: 'center',
                    icon: 'warning',
                    title: `Product deleted, but image cleanup failed: ${deleteStorageError.message}`,
                    showConfirmButton: false,
                    timer: 3000,
                  });
                } else {
                  console.log(
                    'Image successfully deleted from Supabase Storage.'
                  );
                }
              } catch (storageException: any) {
                // Catch unexpected network/runtime errors during Supabase delete call
                console.error(
                  'Unexpected error during Supabase image deletion:',
                  storageException.message
                );
                Swal.fire({
                  color: '#0a0a0a',
                  position: 'center',
                  icon: 'warning',
                  title: `Product deleted, but unexpected image cleanup error: ${storageException.message}`,
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
            } else {
              console.warn(
                'Could not extract file path from product image URL:',
                productImageURL
              );
              // Product deleted, but image URL was malformed, so couldn't delete from storage.
            }
          } else {
            console.log(
              'No image URL found for product, skipping Supabase deletion.'
            );
          }

          Swal.fire({
            color: '#0a0a0a',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            confirmButtonColor: '#0a0a0a',
          });
        }
      });
    } catch (err: any) {
      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'error',
        title: `${err.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className='bg-white p-4 py-10 background-white rounded-xl'>
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
              {categoriesData.length > 0 ? (
                categoriesData.map((category: Category) => (
                  <SelectItem key={category._id} value={category.name}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='no-categories'>
                  No categories available
                </SelectItem>
              )}
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
            <TableHead className='w-[100px]'>Created At</TableHead>
            <TableHead className='text-right w-[200px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData &&
            productsData.map((product) => (
              <TableRow key={product._id}>
                <TableCell className='font-medium'>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>₱{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className='text-right'>
                  {product.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell className='text-right flex justify-end gap-1'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='bg-green-700 py-1 px-2 rounded cursor-pointer'>
                        <Pencil className='text-white w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className='bg-red-700 py-1 px-2 rounded cursor-pointer'
                        onClick={() =>
                          handleDelete(product._id, product.imgURL)
                        }>
                        <Trash className='text-white w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}

          {isLoading && (
            <>
              <TableRow>
                <TableCell className='font-medium'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
