import { useAuth } from '@/context/auth-context';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PrivateRouteProps = PropsWithChildren;
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};
