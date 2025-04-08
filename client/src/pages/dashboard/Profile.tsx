import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPen, Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { useUpdateMutation } from '@/features/auth/usersApiSlice';
import { setCredentials } from '@/features/auth/authSlice';
import { useState } from 'react';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email().min(5),
    password: z
      .string()
      .min(6, { message: 'Must be 6 or more characters long' })
      .max(20, { message: 'Must be 20 or fewer characters long' })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only perform the password match validation if both passwords are provided
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }

      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

const Profile = () => {
  const [open, setOpen] = useState(false);

  const [update, { isLoading }] = useUpdateMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleSaveClick = () => {
    setOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      password: undefined,
      confirmPassword: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await update({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='grid lg:grid-cols-2 gap-3'>
      <div className='bg-white p-5 lg:py-7 border rounded-lg'>
        <div className='flex flex-col gap-y-3 items-center my-6'>
          <Avatar className='w-1/2 lg:w-1/3 h-auto'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className='flex gap-x-1 border border-[#e5e5e5] py-1 px-3 rounded-lg text-sm items-center cursor-pointer hover:opacity-70'>
              <UserPen className='w-4' />
              Edit Profile
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <h2 className='mb-6 font-bold text-lg'>Update profile</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your username' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Confirm your password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className='w-full mb-0'
                    type='submit'
                    disabled={isLoading}
                    onClick={handleSaveClick}>
                    {isLoading && <Loader2 className='animate-spin' />}
                    Save
                  </Button>

                  <Separator className='my-6' />
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
        <div className='lg:mx-10 mx-3 flex flex-col gap-y-2'>
          <p className='text-2xl font-bold line-clamp-1'>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.role}</p>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <div className='bg-white p-4 border rounded-lg opacity-40'>info</div>
        <div className='bg-white p-4 border rounded-lg opacity-40'>info</div>
      </div>
    </div>
  );
};

export default Profile;
