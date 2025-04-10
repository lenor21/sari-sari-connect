import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useState, useEffect } from 'react';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/features/product/categoryApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Skeleton } from '@/components/ui/skeleton';
import Swal from 'sweetalert2';
import { Trash, Pencil } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Category {
  _id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const Category = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: categoriesDataRaw, isLoading: loadingCategoriesData } =
    useGetCategoriesQuery(userInfo?._id);
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addCategory({
        name: values.name,
      }).unwrap();

      form.setValue('name', '');
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
  }

  const handleDelete = async (categoryId: string) => {
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
          await deleteCategory(categoryId).unwrap();

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
    <div className='grid lg:grid-cols-2 gap-4'>
      <div className='bg-white background-white p-6 rounded-xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Add Category</Button>
          </form>
        </Form>
      </div>
      <div className='bg-white background-white p-6 overflow-scroll lg:overflow-hidden rounded-xl'>
        <Table>
          <TableCaption>A list of products category.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Category Id</TableHead>
              <TableHead className='text-right'>Name</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesData.map((category) => (
              <TableRow key={category._id}>
                <TableCell className='font-medium'>{category._id}</TableCell>
                <TableCell className='text-right'>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </TableCell>
                <TableCell className='text-right flex justify-end gap-1'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className='bg-green-700 py-1 px-2 rounded'>
                        <Pencil className='text-white w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className='bg-red-700 py-1 px-2 rounded'
                        onClick={() => handleDelete(category._id)}>
                        <Trash className='text-white w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
            {loadingCategoriesData && (
              <>
                <TableRow>
                  <TableCell className='font-medium'>
                    <Skeleton className='h-4 w-[150px]' />
                  </TableCell>
                  <TableCell className='flex justify-end'>
                    <Skeleton className='h-4 w-[150px] lg:w-[250px]' />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <Skeleton className='h-4 w-[150px]' />
                  </TableCell>
                  <TableCell className='flex justify-end'>
                    <Skeleton className='h-4 w-[150px] lg:w-[250px]' />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <Skeleton className='h-4 w-[150px]' />
                  </TableCell>
                  <TableCell className='flex justify-end'>
                    <Skeleton className='h-4 w-[150px] lg:w-[250px]' />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Category;
