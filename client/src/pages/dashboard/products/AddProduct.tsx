import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/features/product/categoryApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useState, useEffect } from 'react';
import { useAddProductMutation } from '@/features/product/productsApiSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { supabase, supabaseUrl } from '@/lib/supaBaseProfileClient';

interface Category {
  _id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 10 characters.' })
    .max(150, {
      message: 'Description must not be longer than 30 characters.',
    }),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  category: z.string({
    required_error: 'You cannot add a product if your category is empty.',
  }),
});

const AddProduct = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: categoriesDataRaw } = useGetCategoriesQuery(userInfo?._id);
  const [addProduct] = useAddProductMutation();

  const navigate = useNavigate();

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
      description: '',
      price: 0,
      quantity: 0,
      category: '',
    },
  });

  const bucketName = 'sari-sari-connect';
  const folderName = 'products';

  const handleImageUpload = async (img: File) => {
    const fileName = `${Date.now()}-${img.name.replace(/\s+/g, '_')}`; // Replace spaces for URL safety
    const filePathBucket = `${folderName}/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePathBucket, img, {
          cacheControl: '3600', // Cache for 1 hour
          upsert: false, // Don't replace if file exists
        });

      if (error) {
        throw error;
      }

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
      return publicUrl;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let finalImageUrl: string | undefined | null = undefined;

      if (image instanceof File) {
        finalImageUrl = await handleImageUpload(image);
      }

      const product = await addProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        category: values.category,
        imgURL: finalImageUrl,
      }).unwrap();

      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'success',
        title: 'Product has been added',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard/products');
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

  return (
    <div className='grid place-items-center pt-5 lg:pt-10'>
      <Card className='w-full lg:w-[450px]'>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter your product description'
                        {...field}
                        className='resize-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter your product price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter your product price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a product category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesData.length > 0 ? (
                          categoriesData.map((category: Category) => (
                            <SelectItem
                              key={category._id}
                              value={category.name}>
                              {category.name.charAt(0).toUpperCase() +
                                category.name.slice(1)}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value='no-categories'>
                            Please add a category to proceed
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel className='mb-2'>Product image</FormLabel>
                <Input
                  id='picture'
                  type='file'
                  accept='image/*'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);

                      const cachedURL = URL.createObjectURL(e.target.files[0]);
                      setImageURL(cachedURL);
                    }
                  }}
                  required
                />
                {imageURL && (
                  <img
                    src={imageURL}
                    alt='Product image'
                    className='w-full mx-auto object-contain mt-2'
                  />
                )}
              </div>
              <Button type='submit'>Add Product</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
