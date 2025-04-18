import { machineApi } from '@/data/api';
import { Button } from '@/shared/components/atom/button';
import { Card, CardContent } from '@/shared/components/atom/card';
import { Flex } from '@/shared/components/atom/layout';
import { Loading } from '@/shared/components/atom/layout/loading';
import { ScrollArea } from '@/shared/components/atom/scroll-area';
import Typography from '@/shared/components/atom/typography';
import { Meter } from '@/shared/components/molecules/meter';
import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogTrigger
} from '@/shared/components/molecules/morphing-dialog';
import { MAX_POINTS } from '@/shared/constants/chart';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronRight, CornerRightDown, EllipsisVertical, Gauge, Plug, Thermometer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';

function MachineIdPage() {
  const { machine_id } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ['machineApi/machine_id'],
    queryFn: () => {
      if (!machine_id) throw new Error('Machine ID is required');
      const id = parseInt(machine_id);
      if (isNaN(id)) throw new Error('Invalid Machine ID');

      return machineApi.machineIdGet(id).then((res) => res.data);
    }
  });
  const [chartData, setChartData] = useState({
    usage: [{ x: dayjs().valueOf(), y: 0 }],
    energy: [{ x: dayjs().valueOf(), y: 0 }],
    temperature: [{ x: dayjs().valueOf(), y: 0 }]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const now = dayjs().valueOf();
        const newUsage = Math.floor(Math.random() * 100);
        const newEnergy = Math.floor(Math.random() * 500);
        const newTemperature = Math.floor(Math.random() * 50);

        let usage = prev.usage.splice(-MAX_POINTS + 1);
        let energy = prev.energy.splice(-MAX_POINTS + 1);
        let temperature = prev.temperature.splice(-MAX_POINTS + 1);

        if (usage.length >= MAX_POINTS - 1) usage = usage.splice(-10);
        if (energy.length >= MAX_POINTS - 1) energy = energy.splice(-10);
        if (temperature.length >= MAX_POINTS - 1) temperature = temperature.splice(-10);
        console.log(usage);

        const updated = {
          usage: [...usage, { x: now, y: newUsage }],
          energy: [...energy, { x: now, y: newEnergy }],
          temperature: [...temperature, { x: now, y: newTemperature }]
        };
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const warningColor = useMemo(() => {
    // if (machine?.temperature > 90) {
    //   return 'red';
    // } else if (machine?.temperature > 70) {
    //   return 'yellow';
    // }
    return 'green';
  }, []);

  if (isPending) return <Loading />;
  if (error) return <div>Erro ao localizar a maquina...</div>;

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-4 2xl:grid-cols-2">
      <Flex justify="between" align="start" className="w-full">
        <Flex vertical>
          <Typography.Title level={2}>{data?.machine.name}</Typography.Title>
          <Typography.Paragraph className="text -xs text-neutral-800/50 dark:text-neutral-100/15">
            {data?.machine.description}
          </Typography.Paragraph>
        </Flex>
        <Button children={<EllipsisVertical size={16} />} variant="ghost" size="icon" />
      </Flex>
      <div className="grid size-full grid-cols-1 gap-8 p-4 lg:grid-cols-2">
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <Meter
            label="Temperature"
            icon={<Thermometer size={20} className="text-neutral-500 dark:text-neutral-600" />}
            currentValue={chartData.temperature[chartData.temperature.length - 1].y}
            max={120}
            min={-25}
            className="w-full"
          />
          <Meter
            label="Energy Consumption"
            icon={<Plug className="text-neutral-500 dark:text-neutral-600" size={20} />}
            currentValue={chartData.energy[chartData.energy.length - 1].y}
            max={400}
            min={0}
            className="w-full"
          />
          <Meter
            label="Usage"
            icon={<Gauge className="text-neutral-500 dark:text-neutral-600" size={20} />}
            currentValue={chartData.usage[chartData.usage.length - 1].y}
            max={100}
            min={0}
            className="w-full"
            displayFormat="percentage"
          />
        </div>
        <LogsCard />
      </div>
      <Flex wrap="wrap">
        <MachineChart chartData={chartData} />
        <MachineChart chartData={chartData} />
      </Flex>
    </div>
  );
}

export default MachineIdPage;

const LogsCard = () => {
  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <Card className="group/terminalcard relative size-full h-28 flex-1 cursor-pointer gap-2 overflow-hidden bg-neutral-800 px-4 py-2 transition-all hover:h-32 hover:scale-[1.025]">
          <div className="absolute inset-0 size-full bg-linear-to-t from-neutral-800 to-transparent transition-colors group-hover/terminalcard:from-neutral-700/5"></div>
          <Flex justify="between" align="center">
            <Flex className="gap-1">
              <div className="size-3 rounded-full bg-red-400" />
              <div className="size-3 rounded-full bg-yellow-400" />
              <div className="size-3 rounded-full bg-green-400" />
            </Flex>
            <MorphingDialogTitle className="font-bold text-neutral-400">Logs</MorphingDialogTitle>
          </Flex>
          {[
            {
              message: 'Maquina desligada',
              date: '20:30:23'
            },
            {
              message: 'Maquina ligada',
              date: '17:30:23'
            },
            {
              message: 'Maquina desligada',
              date: '15/04/2025 20:30:23'
            }
          ].map((msg) => (
            <Flex align="center" justify="between" key={msg.date}>
              <Typography.Paragraph className="m-0 flex items-center justify-center text-sm font-bold text-neutral-500">
                <ChevronRight size={16} />
                {msg.message}
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 text-xs font-bold text-neutral-500">{msg.date}</Typography.Paragraph>
            </Flex>
          ))}
          <CornerRightDown className="absolute right-4 bottom-4 scale-100 animate-pulse stroke-3 text-neutral-400 opacity-100 shadow-white drop-shadow-xs transition-all group-hover/terminalcard:bottom-[-1rem] group-hover/terminalcard:scale-0 group-hover/terminalcard:text-white group-hover/terminalcard:opacity-0" />
        </Card>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="mt-[50dvh] size-full">
          <Card className="group/terminalcard size-full gap-2 rounded-b-none border-none bg-neutral-800 px-4 py-2">
            <Flex justify="between" align="center">
              <Flex className="gap-1">
                <div className="size-4 rounded-full bg-red-400" />
                <div className="size-4 rounded-full bg-yellow-400" />
                <div className="size-4 rounded-full bg-green-400" />
              </Flex>
              <MorphingDialogTitle className="font-bold text-neutral-400">Logs</MorphingDialogTitle>
            </Flex>
            <ScrollArea>
              {[
                {
                  message: 'Maquina desligada',
                  log: 'Device detected a power off',
                  date: '20:30:23'
                },
                {
                  message: 'Maquina ligada',
                  log: 'Device detected a power on',
                  date: '17:30:23'
                },
                {
                  message: 'Maquina desligada',
                  log: 'Device detected a power off',
                  date: '15/04/2025 20:30:23'
                },
                {
                  message: 'Alerta!',
                  log: 'Device detected a high temperature',
                  date: '15/04/2025 20:20:23'
                }
              ].map((msg) => (
                <Flex align="start" justify="between" key={msg.date}>
                  <Flex align="start" justify="start">
                    <ChevronRight size={18} strokeWidth={3} className="mt-2 text-neutral-500" />
                    <Flex align="start" className="gap-0" vertical>
                      <Typography.Paragraph className="m-0 flex items-center justify-center text-sm font-bold text-neutral-500">
                        {msg.message}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="flex items-center justify-center text-xs font-bold text-neutral-600">
                        {msg.log}
                      </Typography.Paragraph>
                    </Flex>
                  </Flex>
                  <Typography.Paragraph className="m-0 text-xs font-bold text-neutral-500">
                    {msg.date}
                  </Typography.Paragraph>
                </Flex>
              ))}
            </ScrollArea>
          </Card>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

type ChartData = {
  usage: { x: number; y: number }[];
  energy: { x: number; y: number }[];
  temperature: { x: number; y: number }[];
};

const MachineChart = ({ chartData }: { chartData: ChartData }) => {
  return (
    <Card className="aspect-[14/9] flex-1 p-2">
      <CardContent className="size-full max-w-2xl p-1">
        <Chart
          height="100%"
          width="100%"
          options={{
            chart: {
              id: 'realtime',
              animations: {
                enabled: true,
                animateGradually: {
                  enabled: true,
                  delay: 500
                },
                dynamicAnimation: {
                  speed: 1000
                }
              },
              toolbar: {
                show: false
              }
            },
            xaxis: {
              type: 'datetime',
              range: 9000,
              labels: {
                datetimeUTC: false
              }
            },
            stroke: {
              width: 3,
              curve: 'smooth'
            },
            title: {
              text: 'Gráficos em Tempo Real'
            },
            subtitle: {
              text: 'Últimas atualizações'
            }
          }}
          series={[
            { name: 'Usage', data: chartData.usage },
            { name: 'Energy Consumption', data: chartData.energy },
            { name: 'Temperature', data: chartData.temperature }
          ]}
          type="line"
        />
      </CardContent>
    </Card>
  );
};
