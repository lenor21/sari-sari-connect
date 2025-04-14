import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router';
import { useGetProductsQuery } from '@/features/product/productsApiSlice';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  price: number;
  quantity: number;
  createdAt: Date;
}

const ShopProducts = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const { id } = useParams();

  const { data: productsDataRaw } = useGetProductsQuery(id);

  useEffect(() => {
    if (productsDataRaw) {
      const processedProducts = productsDataRaw.map((product: Product) => {
        return {
          ...product,
          createdAt: new Date(product.createdAt),
        };
      });

      setProductsData(processedProducts);
    }
  }, [productsDataRaw]);

  return (
    <div>
      <Card className='py-3 lg:py-5 gap-y-2'>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent className='px-1 lg:px-0'>
          <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 bg-white background-white p-2 lg:p-4'>
            {productsData.length > 0 ? (
              productsData.map((product: Product) => (
                <Link
                  to={product._id}
                  className='rounded-lg shadow-lg border border-[#eee] overflow-hidden group'
                  key={product._id}>
                  <div className='w-full overflow-hidden'>
                    <img
                      src='https://media.istockphoto.com/id/157587362/photo/detailed-close-up-of-sliced-grain-bread-on-white-background.jpg?s=2048x2048&w=is&k=20&c=ut6-wCXQie85gZXY2yXR0aGgNcVqF7u9qUgWOjkgCLs='
                      alt='profile'
                      className='w-full object-cover group-hover:scale-[1.2] transition-all'
                    />
                  </div>
                  <div className='p-3 group-hover:opacity-50 transition-all'>
                    <p className='text-sm lg:text-xl font-medium line-clamp-1'>
                      {product.name}
                    </p>
                    <p className='text-sm text-[#737373] line-clamp-2'>
                      ₱ {product.price}
                    </p>
                    <p className='text-sm text-[#737373] line-clamp-2'>
                      Stocks: {product.quantity}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopProducts;
