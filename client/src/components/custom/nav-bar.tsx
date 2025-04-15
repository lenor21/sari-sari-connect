import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { ModeToggle } from '@/components/custom/mode-toggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import LogOutButton from './logout-button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NavBar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className='border border-b-[1px] border-b-[#e5e5e5] w-full h-14 fixed top-0 left-0 flex items-center justify-between px-4'>
      <Link
        to='/'
        className='text-lg md:text-xl font-extrabold tracking-tight flex items-center gap-x-2'>
        <ShoppingBag />
        Sari-Sari Connect
      </Link>

      <div className='flex gap-x-4 items-center'>
        <ModeToggle />

        {userInfo ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link to='/' className='block relative mr-2'>
                    {cartItems.length >= 1 ? (
                      <Badge
                        variant='destructive'
                        className='absolute top-[-12px] left-[8px]'>
                        {cartItems.length}
                      </Badge>
                    ) : (
                      ''
                    )}

                    <ShoppingCart />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shopping cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to='/dashboard' className='w-full'>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className='cursor-pointer'>Account</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Get Started</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='/sign-in' className='w-full'>
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to='/sign-up' className='w-full'>
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default NavBar;
