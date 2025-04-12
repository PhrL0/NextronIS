import { ThemeProvider } from './components/ui/theme-provider';
import { AuthProvider } from './context/auth-context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider> {children}</AuthProvider>
    </ThemeProvider>
  );
};
