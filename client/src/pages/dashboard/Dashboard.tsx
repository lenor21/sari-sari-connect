import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/side-bar';
import { Outlet } from 'react-router';
import BreadCrumb from '@/components/custom/breadcrumb';
import { Separator } from '@/components/ui/separator';

export default function Layout() {
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
