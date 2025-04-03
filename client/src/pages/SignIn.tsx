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
import { Mail, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useLoginMutation } from '@/features/auth/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

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
    } catch (err) {
      console.error(err);
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
            <Mail /> Sign in with Gmail
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
