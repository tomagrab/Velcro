import { z } from 'zod';

export const NoteFormSchema = z.object({
  issue: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(256, { message: 'Title must be at most 256 characters long' }),
  content: z
    .string()
    .min(3, { message: 'Content must be at least 3 characters long' })
    .max(10000, { message: 'Content must be at most 10000 characters long' }),
});
