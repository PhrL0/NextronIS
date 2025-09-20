import { machineTypeApi, roleApi } from '@/data/api';
import { Button } from '@/shared/components/atom/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/atom/form';
import { Input } from '@/shared/components/atom/input';
import { Textarea } from '@/shared/components/atom/textarea';
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
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const newRoleModalSchema = z.object({
  name: z.string().min(8, {
    message: 'Name must be at least 8 characters.'
  }),
  description: z.string()
});

type NewRoleModalProps = {
  trigger: ReactNode;
};
const NewRoleModal = ({ trigger }: NewRoleModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof newRoleModalSchema>>({
    resolver: zodResolver(newRoleModalSchema),
    defaultValues: {
      name: '',
      description: ''
    },
    shouldFocusError: true
  });

  async function onSubmit(values: z.infer<typeof newRoleModalSchema>) {
    setIsSending(true);
    await roleApi
      .rolePost({
        name: values.name,
        description: values.description
      })
      .finally(() => {
        setIsSending(false);
        setIsOpen(false);
        queryClient.refetchQueries({ queryKey: ['roleApi/roles'] });
      });
  }
  const onError: SubmitErrorHandler<z.infer<typeof newRoleModalSchema>> = (errors) => {
    console.log(errors);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New role</DialogTitle>
          <DialogDescription>Registering a new user role</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogDescription>This informations is used to register a user role.</DialogDescription>
            <DialogFooter>
              <Button type="submit" disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 strokeWidth={3} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Plus strokeWidth={3} /> Add role
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoleModal;
