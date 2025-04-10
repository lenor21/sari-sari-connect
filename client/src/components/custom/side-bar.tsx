import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

// Menu items.
const items = [
  {
    title: 'Store',
    isActive: true,
    roles: ['store', 'user'],
    items: [
      {
        title: 'Products',
        url: '/dashboard/products',
        roles: ['store'],
      },
      {
        title: 'Add Product',
        url: '/dashboard/products/add-product',
        roles: ['store'],
      },
      {
        title: 'Categories',
        url: '/dashboard/products/categories',
        roles: ['store'],
      },
      {
        title: 'Users',
        url: '/dashboard/users',
        roles: ['store'],
      },
      {
        title: 'Shop',
        url: '/dashboard/shop',
        roles: ['user'],
      },
    ],
  },
  {
    title: 'Payments',
    isActive: true,
    roles: ['store', 'user'],
    items: [
      {
        title: 'Bills',
        url: '#',
        roles: ['store', 'user'],
      },
    ],
  },
];

export function AppSidebar() {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <Sidebar>
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => {
              if (item.roles.includes(userInfo.role)) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className='group/collapsible list-none'>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <span>{item.title}</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => {
                            if (subItem.roles.includes(userInfo.role)) {
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            }
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
