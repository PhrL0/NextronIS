import { machineTypeApi } from '@/data/api';
import NewMachineTypeModal from '@/features/machineType/components/organisms/NewMachineTypeModal';
import { Button } from '@/shared/components/atom/button';
import { Input } from '@/shared/components/atom/input';
import { Flex } from '@/shared/components/atom/layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/atom/table';
import Typography from '@/shared/components/atom/typography';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Plus, Trash } from 'lucide-react';
import React from 'react';

const MachineTypeRegisterPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['machineTypeApi/machineTypes'],
    queryFn: () => {
      return machineTypeApi.machineTypeGet().then((res) => res.data);
    }
  });
  return (
    <Flex vertical className="size-full p-4">
      <Flex align="start" vertical className="mb-4 w-full">
        <Typography.Title>Machine Type</Typography.Title>
        <Typography.Paragraph className="text-neutral-400">Manage all machine types.</Typography.Paragraph>
      </Flex>

      <Flex className="w-full" align="center" justify="between">
        <Input className="w-full max-w-2xs" placeholder="Search..." type="search" />
        <NewMachineTypeModal
          trigger={
            <Button>
              <Plus strokeWidth={3} />
              Register
            </Button>
          }
        />
      </Flex>

      <Flex className="w-full" align="center" justify="between">
        <Table>
          <TableCaption>A list of all machine types recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[96px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.machine_types.map((mt) => (
              <TableRow key={mt.machine_type_id}>
                <TableCell className="font-medium">{mt.name}</TableCell>
                <TableCell className="font-medium">{mt.description}</TableCell>
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
        {/* <DataTable loading={isPending} data={data?.machine_types || []} size="xs" /> */}
      </Flex>
    </Flex>
  );
};

export default MachineTypeRegisterPage;
