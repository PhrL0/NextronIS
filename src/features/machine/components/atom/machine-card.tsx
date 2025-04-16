import { MachineGet200ResponseMachinesInner } from '@/generate-api';
import clsx from 'clsx';
import { ChevronsUp, EllipsisVertical, Gauge, Plug, Thermometer } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../../shared/components/atom/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../shared/components/atom/card';
import { Flex } from '../../../../shared/components/atom/layout';
import Typography from '../../../../shared/components/atom/typography';
import { Meter } from '../../../../shared/components/molecules/meter';

type MachineCardProps = {
  machine: MachineGet200ResponseMachinesInner;
  variant?: 'small' | 'large' | undefined;
};

export const MachineCard = ({ machine }: MachineCardProps) => {
  const warningColor = useMemo(() => {
    // if (machine?.temperature > 90) {
    //   return 'red';
    // } else if (machine?.temperature > 70) {
    //   return 'yellow';
    // }
    return 'green';
  }, []);
  return (
    <Card
      className={clsx(
        `bg-${warningColor}-600/50 bg-green-500/5`,
        `border-${warningColor}-700/25`,
        `shadow-${warningColor}-700/20 shadow-md`,
        'min-w-xs gap-0 pb-0'
      )}
    >
      <CardHeader className="pb-0">
        <Flex justify="between" align="start">
          <Flex vertical>
            <CardTitle>{machine.name}</CardTitle>
            <Typography.Paragraph className="text-xs text-neutral-800/50 dark:text-neutral-100/15">
              {machine.location.name}
            </Typography.Paragraph>
          </Flex>
          <Button children={<EllipsisVertical size={16} />} variant="ghost" size="icon" />
        </Flex>
      </CardHeader>
      <CardContent className="p-0 px-3">
        <Flex className="p-4" justify="between" align="end">
          <div className="flex flex-wrap items-start justify-start gap-2">
            <Meter
              vertical
              icon={<Thermometer size={20} className="text-neutral-500 dark:text-neutral-600" />}
              currentValue={30}
              max={120}
              min={-25}
            />
            <Meter
              vertical
              icon={<Plug className="text-neutral-500 dark:text-neutral-600" size={20} />}
              currentValue={86}
              max={120}
              min={-25}
            />
            <Meter
              vertical
              icon={<Gauge className="text-neutral-500 dark:text-neutral-600" size={20} />}
              currentValue={50}
              max={100}
              min={0}
              displayFormat="percentage"
            />
          </div>
          <Link to={`${machine.machine_id}`}>
            <Button variant="ghost" size="icon">
              <ChevronsUp />
            </Button>
          </Link>
        </Flex>
      </CardContent>
    </Card>
  );
};
