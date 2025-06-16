import MyCustomPagination from '@/components/custom/pagination';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useGetStoresQuery } from '@/features/auth/usersApiSlice';

interface Store {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}

const Shop = () => {
  const [storesData, setStoresData] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const { data: storesDataRaw } = useGetStoresQuery({
    page: currentPage,
    limit: limit,
  });

  useEffect(() => {
    if (storesDataRaw) {
      const stores = storesDataRaw.stores;

      const processedStores = stores.map((store: Store) => {
        return {
          ...store,
        };
      });

      setStoresData(processedStores);
      setCurrentPage(storesDataRaw.currentPage);
      setTotalPages(storesDataRaw.totalPages);
    }
  }, [storesDataRaw]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Card className='py-3 lg:py-5 gap-y-2'>
        <CardHeader>
          <CardTitle>Stores</CardTitle>
        </CardHeader>
        <CardContent className='px-1 lg:px-0'>
          <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 bg-white background-white p-2 lg:p-4'>
            {storesData.length > 0 ? (
              storesData.map((store: Store) => (
                <Link
                  to={store._id}
                  className='rounded-lg shadow-lg border border-[#eee] overflow-hidden group'
                  key={store._id}>
                  <div className='w-full overflow-hidden'>
                    {store.profileImage ? (
                      <img
                        src={`${store.profileImage}`}
                        alt='profile'
                        className='w-full object-cover group-hover:scale-[1.2] transition-all'
                      />
                    ) : (
                      <img
                        src={`https://images.unsplash.com/photo-1604066867775-43f48e3957d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                        alt='profile'
                        className='w-full object-cover group-hover:scale-[1.2] transition-all'
                      />
                    )}
                  </div>
                  <div className='p-3 group-hover:opacity-50 transition-all'>
                    <p className='text-sm lg:text-lg line-clamp-1'>
                      {store.name}
                    </p>
                    <p className='text-sm text-[#737373] line-clamp-2'>
                      {store.email}
                    </p>
                    <p className='text-sm text-[#737373] line-clamp-2'>
                      {store.role}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No stores available</p>
            )}
          </div>
        </CardContent>

        {storesData.length > 0 && (
          <MyCustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </Card>
    </div>
  );
};

export default Shop;
