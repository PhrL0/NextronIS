import { AppSidebar } from '@/components/app/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../components/app/app-header';

const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Outlet />
      </SidebarInset>
      {/* <Footer></Footer> */}
    </SidebarProvider>
  );
};

export default App;
