import { Flex } from '@/shared/components/atom/layout';
import { Loading } from '@/shared/components/atom/layout/loading';

type LoadingPageProps = {
  loading: boolean;
  children: React.ReactNode;
};
export const LoadingPage = ({ loading, children }: LoadingPageProps) => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        className={`pointer-events-none absolute inset-0 z-[999999999] bg-neutral-100 transition-all duration-700 dark:bg-neutral-950 ${!loading && 'opacity-0'}`}
      >
        <Loading variant="medium" title="Carregando sistema..." />
      </Flex>
      {children}
    </>
  );
};
