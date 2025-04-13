// src/pages/DashboardPage.tsx
import { machineApi } from '@/api';
import { DataTable } from '@/components/data-table/data-table';
import { Flex } from '@/components/layout';
import { Loading } from '@/components/layout/loading';
import { MachineCard } from '@/components/machine-card';
import Typography from '@/components/typography';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useQuery } from '@tanstack/react-query';
import { Square, Table } from 'lucide-react';
import { useState } from 'react';

function MachinesPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ['machineApi/machines'],
    queryFn: () => machineApi.machineGet().then((res) => res.data)
  });
  const [view, setView] = useState('card');

  // Dados simulados – substitua pela chamada à sua API ou lógica de negócio.

  return (
    <Flex vertical className="p-4">
      <Flex align="center" justify="between" className="mb-4 w-full">
        <Typography.Title>Machines</Typography.Title>
        <ToggleGroup type="single" size="lg" onValueChange={(value) => setView(value)}>
          <ToggleGroupItem value="table" aria-label="Toggle bold">
            <Table />
          </ToggleGroupItem>
          <ToggleGroupItem value="card" aria-label="Toggle italic">
            <Square />
          </ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      {view === 'card' ? (
        isPending ? (
          <Flex className="mt-16 size-full" align="center" justify="center">
            <Loading variant="medium" title="Carregando..." />
          </Flex>
        ) : (
          <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(var(--container-xs),_1fr))] gap-8">
            {data?.machines.map((m) => <MachineCard machine={m} />)}
          </div>
        )
      ) : (
        <DataTable loading={isPending} data={data?.machines || []} size="xs" />
      )}
    </Flex>
  );
}

export default MachinesPage;
