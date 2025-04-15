import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'react-router';
import { useGetProductsQuery } from '@/features/product/productsApiSlice';
import { useEffect, useState } from 'react';
import ShopProductCard from '@/components/custom/shop-product-card';

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
                <ShopProductCard key={product._id} {...product} />
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
