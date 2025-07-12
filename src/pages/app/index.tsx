import { AppSidebar } from '@/features/app/components/molecules/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/organisms/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../features/app/components/molecules/app-header';
import { LoadingPage } from './loading';

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(interval);
  }, []);
  return (
    <LoadingPage loading={loading}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />

            <Outlet />
          </SidebarInset>
          {/* <Footer></Footer> */}
        </SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LoadingPage>
  );
};

export default App;
