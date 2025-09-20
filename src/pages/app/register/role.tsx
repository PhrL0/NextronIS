import { roleApi } from '@/data/api';
import NewRoleModal from '@/features/role/components/organisms/NewRoleModal';
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

const RoleRegisterPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['roleApi/roles'],
    queryFn: () => {
      return roleApi.roleGet().then((res) => res.data);
    }
  });
  return (
    <Flex vertical className="size-full p-4">
      <Flex align="start" vertical className="mb-4 w-full">
        <Typography.Title>Roles</Typography.Title>
        <Typography.Paragraph className="text-neutral-400">Manage all user roles .</Typography.Paragraph>
      </Flex>

      <Flex className="w-full" align="center" justify="between">
        <Input className="w-full max-w-2xs" placeholder="Search..." type="search" />
        <NewRoleModal
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
            {data?.roles.map((role) => (
              <TableRow key={role.role_id}>
                <TableCell className="font-medium">{role.role}</TableCell>
                <TableCell className="font-medium">{role.description}</TableCell>
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

export default RoleRegisterPage;
