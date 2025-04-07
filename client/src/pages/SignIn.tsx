import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useLoginMutation } from '@/features/auth/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import Swal from 'sweetalert2';

const formSchema = z.object({
  email: z.string().email().min(5),
  password: z
    .string()
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
});

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      navigate('/dashboard');
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
    <div className='min-h-screen grid place-items-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter to have an access to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
              <Button
                className='w-full mb-0'
                type='submit'
                disabled={isLoading}>
                {isLoading && <Loader2 className='animate-spin' />}
                Sign In
              </Button>

              <Separator className='my-6' />
            </form>
          </Form>

          <Button className='w-full mb-0' variant='outline'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='currentColor'
              />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link to='/sign-up' className='underline hover:no-underline'>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
