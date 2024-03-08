'use server';

import {
  createNote,
  deleteNote,
  readNote,
  readNotes,
  updateNote,
} from '@/db/prisma';
import { NoteFormSchema } from '@/lib/schemas/NoteFormSchema/NoteFormSchema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const CreateNote = async (values: z.infer<typeof NoteFormSchema>) => {
  const newNote = await createNote(values);

  if (!newNote) {
    throw new Error('Error creating note');
  }

  const noteId = newNote.id.toString();

  if (!noteId) {
    throw new Error('Error creating note');
  }

  revalidatePath(`/`);
};

export const ReadNote = async (id: number) => {
  const note = await readNote(id);

  if (!note) {
    throw new Error('Error reading note');
  }

  return note;
};

export const ReadNotes = async () => {
  const notes = await readNotes();

  if (!notes) {
    throw new Error('Error reading notes');
  }

  return notes;
};

export const UpdateNote = async (
  note: z.infer<typeof NoteFormSchema> & { id: number },
) => {
  const updatedNote = await updateNote(note);

  if (!updatedNote) {
    throw new Error('Error updating note');
  }

  revalidatePath(`/`);
  return updatedNote;
};

export const DeleteNote = async (id: number) => {
  const deletedNote = await deleteNote(id);

  if (!deletedNote) {
    throw new Error('Error deleting note');
  }

  revalidatePath(`/`);
};
