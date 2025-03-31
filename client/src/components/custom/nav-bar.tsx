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
import { ShoppingBag } from 'lucide-react';
import { ModeToggle } from '@/components/custom/mode-toggle';

const NavBar = () => {
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
