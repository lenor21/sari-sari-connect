import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SupabaseProfile from '@/components/custom/supabase-profile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Swal from 'sweetalert2';
import { useUpdateMutation } from '@/features/auth/usersApiSlice';
import { setCredentials } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email().min(5),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const EditProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [update] = useUpdateMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      password: '',
      confirm: '',
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
      navigate('/dashboard');

      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'success',
        title: `Profile updated successfully`,
        showConfirmButton: false,
        timer: 1500,
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
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-center font-semibold text-2xl'>
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className='relative w-fit mx-auto'>
              <Avatar className='w-40 h-40'>
                <AvatarImage
                  src={`${userInfo.profileImage}`}
                  alt='@shadcn'
                  className='object-cover'
                />
                <AvatarFallback>{userInfo.name}</AvatarFallback>
              </Avatar>

              <SupabaseProfile />
            </div>

            <div className='lg:w-1/3 mx-auto mt-6'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Jose Rizal' {...field} />
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
                          <Input placeholder='joserizal@gmail.com' {...field} />
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
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter new password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm new password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Confrim new password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex gap-3'>
                    <Button type='submit'>Update</Button>
                    <Button
                      type='button'
                      onClick={() => navigate('/dashboard')}
                      variant='destructive'>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <Separator className='my-6' />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
