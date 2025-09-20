import { locationApi, machineApi, machineTypeApi } from '@/data/api';
import { Button } from '@/shared/components/atom/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/atom/form';
import { Input } from '@/shared/components/atom/input';
import { Flex } from '@/shared/components/atom/layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atom/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/molecules/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const newMachineModalSchema = z.object({
  title: z.string().min(8, {
    message: 'Title must be at least 8 characters.'
  }),
  location_id: z.string(),
  machine_type_id: z.string()
});

type NewMachineModalProps = {
  trigger: ReactNode;
};
const NewMachineModal = ({ trigger }: NewMachineModalProps) => {
  const { data: locationData } = useQuery({
    queryKey: ['locationApi/locates'],
    queryFn: () => {
      return locationApi.locateGet().then((res) => res.data);
    }
  });
  const { data: machineTypeData } = useQuery({
    queryKey: ['machineTypeApi/machineTypes'],
    queryFn: () => {
      return machineTypeApi.machineTypeGet().then((res) => res.data);
    }
  });
  const form = useForm<z.infer<typeof newMachineModalSchema>>({
    resolver: zodResolver(newMachineModalSchema),
    defaultValues: {
      title: '',
      location_id: '0',
      machine_type_id: '0'
    },
    shouldFocusError: true
  });

  function onSubmit(values: z.infer<typeof newMachineModalSchema>) {
    machineApi.machinePost({
      name: values.title,
      description: values.title,
      location_id: parseInt(values.location_id),
      machine_type_id: parseInt(values.machine_type_id)
    });
  }
  const onError: SubmitErrorHandler<z.infer<typeof newMachineModalSchema>> = (errors) => {
    console.log(errors);
  };

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New machine</DialogTitle>
          <DialogDescription>Registering a new machine</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Flex className="w-full">
              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Location of your machine" {...field} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locationData?.locations.map((loc) => (
                            <SelectItem key={loc.location_id} value={loc.location_id.toString()}>
                              {loc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="machine_type_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Type of your machine" {...field} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {machineTypeData?.machine_types.map((mt) => (
                            <SelectItem key={mt.machine_type_id} value={mt.machine_type_id.toString()}>
                              {mt.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </Flex>
            <DialogDescription>
              This informations is used to register a existing machine, all other data will automatically get by system
            </DialogDescription>
            <DialogFooter>
              <Button type="submit">
                <Plus strokeWidth={3} /> Add machine
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMachineModal;
