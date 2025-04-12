import { MachineGet200ResponseMachinesInner } from '@/generate-api';
import clsx from 'clsx';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Flex } from './layout';
import Typography from './typography';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
        'gap-0 pb-0'
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
          <Button children={<EllipsisVertical size={16} />} variant="ghost" />
        </Flex>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col p-4 pb-0">
          <div className="flex flex-wrap items-start justify-start gap-2">
            <Medidor label="C" currentValue={30} max={120} min={-25} />
            <Medidor label="Energia" currentValue={86} max={120} min={-25} />
            <Medidor label="Uso" currentValue={50} max={120} min={-25} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type MedidorProps = {
  min: number;
  max: number;
  currentValue: number;
  label: string;
};
const Medidor = ({ min, max, currentValue, label }: MedidorProps) => {
  const [percentage, setPercentage] = useState(0);
  const color = useMemo(() => {
    if (percentage > 90) return '#db2d2d';
    if (percentage > 75) return '#d36d28';
    if (percentage > 50) return '#f1dd23';
    if (percentage > 25) return '#66e92a';
    if (percentage > 0) return '#3072ec';
  }, [percentage]);
  useEffect(() => {
    setPercentage((currentValue / max) * 100);
  }, [currentValue, max]);
  return (
    <div className="flex h-full min-h-32 flex-col items-center justify-center gap-1">
      <div className="flex h-24 w-4 items-end rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          style={{
            height: `${percentage}%`,
            width: '100%',
            borderRadius: '1000rem',
            backgroundColor: `${color}`
          }}
        />
      </div>
      <Typography.Paragraph className="text-xs">{label}</Typography.Paragraph>
    </div>
  );
};
