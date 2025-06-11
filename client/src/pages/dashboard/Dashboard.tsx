import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/side-bar';
import { Outlet } from 'react-router';
import BreadCrumb from '@/components/custom/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useGetCartQuery } from '@/features/cart/cartApiSlice';
import { useState, useEffect } from 'react';
import { StoreCart } from '@/types/cart/cartTypes';
import { addTotal } from '@/features/cart/cartSlice';

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

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: cartDataRaw } = useGetCartQuery(userInfo._id);

  useEffect(() => {
    if (cartDataRaw) {
      setCartData(cartDataRaw);
    }
  }, [cartDataRaw]);

  useEffect(() => {
    let calculatedTotalItems = 0;

    if (cartData && cartData.stores) {
      for (const storeEntry of cartData.stores) {
        if (storeEntry.items) {
          for (const item of storeEntry.items) {
            calculatedTotalItems += item.quantity;
          }
        }
      }
    }

    dispatch(addTotal(calculatedTotalItems));
  }, [cartData]);

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
