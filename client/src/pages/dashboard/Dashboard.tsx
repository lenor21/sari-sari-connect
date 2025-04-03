import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/side-bar';
import { Outlet } from 'react-router';
import BreadCrumb from '@/components/custom/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full h-full p-3'>
          <header>
            <div className='flex items-center gap-x-2 lg:gap-x-4 h-5'>
              <SidebarTrigger />
              <Separator orientation='vertical' />
              <BreadCrumb />
            </div>
          </header>

          <ScrollArea className='h-[calc(100svh - 56px)] w-full my-6 bg-[#eee] p-6'>
            <div className='min-h-screen'>
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </SidebarProvider>
    </div>
  );
}
