import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className='container min-h-screen mx-auto px-4 grid place-items-center'>
      <div>
        <div className='container py-24 lg:py-32'>
          {/* Title */}
          <div className='mt-5 max-w-2xl text-center mx-auto'>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
              Simplify Your Sari-Sari Store Experience: Connecting Tindahan &
              Suki
            </h1>
          </div>
          {/* End Title */}
          <div className='mt-5 max-w-3xl text-center mx-auto'>
            <p className='text-xl text-muted-foreground'>
              Empowering sari-sari stores and making shopping easier for
              everyone in the barangay.
            </p>
          </div>
          {/* Buttons */}
          <div className='mt-8 gap-3 flex justify-center'>
            <Button size={'lg'}>
              <Link to='/sign-in'>Get Started</Link>
            </Button>
            <Button size={'lg'} variant={'outline'}>
              <Link to='/store-register'>Register Store</Link>
            </Button>
          </div>
          {/* End Buttons */}
        </div>
      </div>
    </div>
  );
};

export default Home;
