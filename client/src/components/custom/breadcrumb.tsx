import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation, Link } from 'react-router';
import React, { useState, useEffect } from 'react';

const BreadCrumb = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);
  const [showFullBreadcrumb, setShowFullBreadcrumb] = useState(true);
  const maxItemsToShow = 4;

  useEffect(() => {
    const handleResize = () => {
      setShowFullBreadcrumb(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breadcrumbItems = pathNames.map((name, index) => {
    const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathNames.length - 1;
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    const isHidden =
      !showFullBreadcrumb &&
      pathNames.length > 1 &&
      index > 0 &&
      index < pathNames.length - 2;

    return (
      <React.Fragment key={name}>
        <BreadcrumbItem className={isHidden ? 'breadcrumb-hidden' : ''}>
          {isLast ? (
            <BreadcrumbPage>{displayName}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={routeTo}>{displayName}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && !isHidden && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  const ellipsisItem =
    !showFullBreadcrumb && pathNames.length > maxItemsToShow ? (
      <BreadcrumbItem className='breadcrumb-ellipsis'>...</BreadcrumbItem>
    ) : null;

  let visibleBreadcrumbItems = [];

  if (showFullBreadcrumb) {
    visibleBreadcrumbItems = breadcrumbItems;
  } else if (breadcrumbItems.length > 2) {
    visibleBreadcrumbItems = [
      breadcrumbItems[0], // Home
      ellipsisItem,
      ...breadcrumbItems.slice(breadcrumbItems.length - 2), // Last item
    ].filter(Boolean); // Filter out null if ellipsisItem is null
  } else {
    visibleBreadcrumbItems = breadcrumbItems;
  }

  return (
    <Breadcrumb className='px-1'>
      <BreadcrumbList>{visibleBreadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
