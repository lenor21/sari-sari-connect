import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation, Link } from 'react-router';
import React from 'react';

const BreadCrumb = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = pathNames.map((name, index) => {
    const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathNames.length - 1;
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <React.Fragment key={name}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{displayName}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={routeTo}>{displayName}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb className='px-1'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
