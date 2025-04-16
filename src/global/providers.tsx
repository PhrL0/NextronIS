import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/shared/components/organisms/theme-provider';
import { MotionConfig } from 'motion/react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionConfig reducedMotion="user">
        <AuthProvider>{children}</AuthProvider>
      </MotionConfig>
    </ThemeProvider>
  );
};
