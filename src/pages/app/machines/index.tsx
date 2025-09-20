// src/pages/DashboardPage.tsx
import { machineApi } from '@/data/api';
import { MachineCard } from '@/features/machine/components/atom/machine-card';
import NewMachineModal from '@/features/machine/components/organisms/NewMachineModal';
import { Button } from '@/shared/components/atom/button';
import { Input } from '@/shared/components/atom/input';
import { Flex } from '@/shared/components/atom/layout';
import { Loading } from '@/shared/components/atom/layout/loading';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/atom/table';
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/atom/toggle-group';
import Typography from '@/shared/components/atom/typography';
import { Meter } from '@/shared/components/molecules/meter';
import { useQuery } from '@tanstack/react-query';
import { Gauge, Pencil, Plug, Plus, Square, TableIcon, Thermometer, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function MachinesPage() {
  const navigate = useNavigate();
  const { isPending, data } = useQuery({
    queryKey: ['machineApi/machines'],
    queryFn: () => machineApi.machineGet('', 'asc', 'desc', 1, 1000).then((res) => res.data)
  });
  const [view, setView] = useState('table');

  // Dados simulados – substitua pela chamada à sua API ou lógica de negócio.

  return (
    <Flex vertical className="size-full p-4">
      <Flex align="center" justify="between" className="mb-4 w-full">
        <Typography.Title>Machines</Typography.Title>
        <ToggleGroup type="single" size="lg" value={view} onValueChange={(value) => setView(value)}>
          <ToggleGroupItem value="table" aria-label="Toggle bold">
            <TableIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="card" aria-label="Toggle italic">
            <Square />
          </ToggleGroupItem>
        </ToggleGroup>
      </Flex>
      <Flex className="w-full" align="center" justify="between">
        <Input className="w-full max-w-2xs" placeholder="Search..." type="search" />
        <NewMachineModal
          trigger={
            <Button>
              <Plus strokeWidth={3} />
              Register
            </Button>
          }
        />
      </Flex>
      {view === 'card' ? (
        isPending ? (
          <Flex className="mt-16 size-full" align="center" justify="center">
            <Loading variant="medium" title="Carregando..." />
          </Flex>
        ) : (
          <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(var(--container-md),_4fr))] gap-4">
            {data?.machines.map((m) => <MachineCard machine={m} />)}
          </div>
        )
      ) : (
        <>
          <Table>
            <TableCaption>A list of all machine types recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Observation</TableHead>
                <TableHead className="w-[96px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.machines.map((mc) => (
                <TableRow key={mc.machine_id}>
                  <TableCell
                    className="cursor-pointer font-medium hover:underline"
                    onClick={() => navigate(`${mc.machine_id}`)}
                  >
                    {mc.name}
                  </TableCell>
                  <TableCell className="cursor-pointer hover:underline" onClick={() => navigate(`${mc.machine_id}`)}>
                    {mc.machine_type.name}
                  </TableCell>
                  <TableCell className="cursor-pointer hover:underline" onClick={() => navigate(`${mc.machine_id}`)}>
                    {mc.location.name}
                  </TableCell>
                  <TableCell>
                    <Meter
                      icon={<Thermometer size={20} className="text-neutral-500 dark:text-neutral-600" />}
                      currentValue={30}
                      max={120}
                      min={-25}
                      className="w-full"
                    />
                    <Meter
                      icon={<Plug className="text-neutral-500 dark:text-neutral-600" size={20} />}
                      currentValue={86}
                      max={120}
                      min={-25}
                      className="w-full"
                    />
                    <Meter
                      icon={<Gauge className="text-neutral-500 dark:text-neutral-600" size={20} />}
                      currentValue={50}
                      max={100}
                      min={0}
                      displayFormat="percentage"
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell className="space-x-2 font-medium">
                    <Button size="icon" variant="destructive">
                      <Trash />
                    </Button>
                    <Button size="icon">
                      <Pencil />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <DataTable loading={isPending} data={data?.machines || []} size="xs" /> */}
        </>
      )}
    </Flex>
  );
}

export default MachinesPage;
