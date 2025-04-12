// src/pages/DashboardPage.tsx
import { machineApi } from '@/api';
import { DataTable } from '@/components/data-table/data-table';
import { Flex } from '@/components/layout';
import { Loading } from '@/components/layout/loading';
import Typography from '@/components/typography';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MachineGet200ResponseMachinesInner } from '@/generate-api';
import { Square, Table } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MachineCard } from '../../components/machine-card';

const DashboardPage: React.FC = () => {
  const [machines, setMachines] = useState<MachineGet200ResponseMachinesInner[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('card');

  // Dados simulados – substitua pela chamada à sua API ou lógica de negócio.
  useEffect(() => {
    (async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000)); // Simula um atraso de 1 segundo
      const { machines } = (await machineApi.machineGet()).data;

      machines.forEach((mcn) => {
        delete mcn.location_id;
        delete mcn.machine_type_id;
      });
      setMachines(machines);

      setLoading(false);
    })();
  }, []);

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
        loading ? (
          <Flex className="mt-16 size-full" align="center" justify="center">
            <Loading variant="medium" title="Carregando..." />
          </Flex>
        ) : (
          <div className="grid w-full grid-cols-1 content-between gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {machines.map((m) => (
              <MachineCard machine={m} />
            ))}
          </div>
        )
      ) : (
        <DataTable loading={loading} data={machines} size="xs" />
      )}
    </Flex>
  );
};

export default DashboardPage;
