import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useGetUsersQuery } from '@/features/auth/usersApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
interface User {
  _id: string;
  name: string;
  email: string;
}

const Users = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: usersDataRaw } = useGetUsersQuery(userInfo?._id);

  useEffect(() => {
    if (usersDataRaw) {
      // Convert createdAt string to Date object
      const processedUsers = usersDataRaw.map((product: Product) => {
        return {
          ...product,
          createdAt: new Date(product.createdAt),
        };
      });

      setUsersData(processedUsers);
      console.log(processedUsers);
    }
  }, [usersDataRaw]);

  return (
    <div className='grid gap-3 lg:gap-4'>
      <div className='grid lg:grid-cols-4 gap-3 lg:gap-4'>
        <Card className='gap-y-2'>
          <CardHeader>
            <CardTitle>Total Store Users</CardTitle>
            <CardDescription>
              The overall number of registered users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl lg:text-3xl font-extrabold'>
              {usersData.length}
            </p>
          </CardContent>
        </Card>
        <Card className='gap-y-2'>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
            <CardDescription>
              Payments that have not yet been completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl lg:text-3xl font-extrabold'>50</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>List of all the store user</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-3'>
          {usersData.length > 0 ? (
            usersData.map((user: User) => (
              <Link
                to='/dashboard'
                className='rounded-lg shadow-lg border border-[#eee] overflow-hidden group'
                key={user._id}>
                <div className='w-full overflow-hidden'>
                  <img
                    src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='profile'
                    className='w-full object-cover group-hover:scale-[1.2] transition-all'
                  />
                </div>
                <div className='p-3 group-hover:opacity-50 transition-all'>
                  <p className='text-sm lg:text-lg line-clamp-1'>{user.name}</p>
                  <p className='text-sm text-[#737373] line-clamp-2'>
                    {user.email}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
