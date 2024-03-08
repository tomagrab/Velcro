import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NoteFormSchema } from '@/lib/schemas/NoteFormSchema/NoteFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import { CreateNote } from '@/app/actions/NoteActions/NoteActions';
import { notes } from '@prisma/client';

type NoteFormProps = {
  notesPreview?: notes | null;
  handleSetNotesPreview?: (note: notes) => void;
};

export default function NoteForm({
  notesPreview,
  handleSetNotesPreview,
}: NoteFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof NoteFormSchema>>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: {
      issue: notesPreview?.issue || '',
      content: notesPreview?.content || '',
    },
  });

  const { register, handleSubmit, setValue } = form;

  // UseEffect to update form fields when notesPreview changes
  useEffect(() => {
    if (notesPreview) {
      setValue('issue', notesPreview.issue || '');
      setValue('content', notesPreview.content || '');
    }
  }, [notesPreview, setValue]);

  const onSubmit = async (values: z.infer<typeof NoteFormSchema>) => {
    setLoading(true);

    // Call the CreateNote action
    await CreateNote({
      ...values,
    });

    form.reset();
    setLoading(false);
    return;
  };

  return (
    <Form {...form}>
      <div className={`flex w-60 flex-col p-4 shadow-md`}>
        <h2>Notes</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`gap-4- flex grow flex-col justify-between`}
        >
          <div className={`flex flex-col gap-4 `}>
            <FormField
              control={form.control}
              disabled={loading}
              name="issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue</FormLabel>
                  <FormControl>
                    <Input
                      {...register('issue')}
                      onChange={e => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={loading}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...register('content')}
                      onChange={e => {
                        // Call the original onChange from react-hook-form
                        field.onChange(e);
                        // Additional logic if necessary
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {notesPreview && loading
              ? 'Updating...'
              : notesPreview
                ? 'Update'
                : loading
                  ? 'Creating...'
                  : 'Create'}
          </Button>
        </form>
      </div>
    </Form>
  );
}
