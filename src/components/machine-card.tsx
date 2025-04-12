import { EllipsisVertical, Power } from 'lucide-react';
import { useMemo } from 'react';
import { Flex } from './layout';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

type MachineCardProps = {
  machine: any;
  variant?: 'small' | 'large' | undefined;
};

export const MachineCard = ({ machine }: MachineCardProps) => {
  const warningColor = useMemo(() => {
    if (machine.temperature > 90) {
      return '#df0b0b';
    } else if (machine.temperature > 70) {
      return '#dfad0b';
    }
    return '#18b925';
  }, [machine]);
  return (
    <Card>
      <CardHeader>
        <Flex justify="between" align="center">
          <CardTitle>{machine.name}</CardTitle>
          <Badge variant={machine.status == 'Offline' ? 'red' : machine.status != 'Online' ? 'purple' : 'green'}>
            {machine.status}
          </Badge>
        </Flex>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button children={<Power size={16} />} />,
        <Button children={<EllipsisVertical size={16} />} />
      </CardFooter>
      <div className="flex flex-col p-4">
        <div className="flex flex-wrap items-start justify-between">
          <p />
          <p />
          <p />
        </div>
      </div>
    </Card>
  );
};
