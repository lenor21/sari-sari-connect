import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-center font-semibold text-2xl'>
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Avatar className='w-40 h-40 mx-auto'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-center text-3xl font-medium mt-3'>
              Ronel De Jesus
            </p>
            <div className='grid place-items-center mt-3'>
              <Button
                onClick={() => {
                  navigate('/dashboard/edit');
                }}>
                <Pencil />
                Edit profile
              </Button>
            </div>
          </div>
          <Separator className='my-6' />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
