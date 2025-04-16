import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/side-bar';
import { Outlet } from 'react-router';
import BreadCrumb from '@/components/custom/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { StoreCart } from '@/types/cart/cartTypes';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCartQuery } from '@/features/product/cartApiSlice';
import { RootState } from '@/app/store';
import { addTotal } from '@/features/product/cartSlice';

export interface Cart {
  _id: string;
  user: string; // Or ObjectId
  stores: StoreCart[];
  createdAt: string; // Store as string (ISO 8601)
  updatedAt: string; // Store as string (ISO 8601)
  __v: number;
}

export default function Layout() {
  const [cartData, setCartData] = useState<Cart | undefined>();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: cartDataRaw } = useGetCartQuery(userInfo._id);

  useEffect(() => {
    if (cartDataRaw) {
      setCartData(cartDataRaw);
    }
  }, [cartDataRaw]);

  const getTotalItems = (cart: Cart): number => {
    let total = 0;

    cart.stores.forEach((storeCart) => {
      storeCart.items.forEach((item) => {
        total += item.quantity;
      });
    });

    return total;
  };

  const dispatch = useDispatch();

  if (cartData) {
    const totalCart = getTotalItems(cartData);

    dispatch(addTotal(totalCart));
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main id='main' className='w-full h-full p-3 overflow-hidden'>
          <header>
            <div className='flex items-center gap-x-2 lg:gap-x-4 h-5'>
              <SidebarTrigger />
              <Separator orientation='vertical' />
              <BreadCrumb />
            </div>
          </header>

          <div id='content' className='w-full my-4 p-3 lg:p-4'>
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
