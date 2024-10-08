import Loading from '@/app/loading';
import { ReactNode, Suspense } from 'react';
import ProductsHeader from './components/ProductsHeader';
import FilterSidebar from './components/FilterSidebar';
import ProductListProvider from '@/providers/ProductListProvider';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProductListProvider>
          <div className="flex size-full gap-2 overflow-y-auto bg-secondary dark:bg-accent">
            <FilterSidebar />
            <div className="container mx-auto h-fit p-4">
              <ProductsHeader />
              {children}
            </div>
          </div>
        </ProductListProvider>
      </Suspense>
    </>
  );
};

export default CustomerLayout;
