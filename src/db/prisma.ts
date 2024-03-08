import { NoteFormSchema } from '@/lib/schemas/NoteFormSchema/NoteFormSchema';
import { notes } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const prisma = new PrismaClient();

// Define a main function to run your Prisma Client queries
async function main() {
  // ... you will write your Prisma Client queries here
}

// Run the `main` function and exit
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
 * CRUD Operations
 * Create: Create a new record in your database
 * Read: Read a record from your database
 * Update: Update a record in your database
 * Delete: Delete a record from your database
 */

/*
 * Notes CRUD
 */

export const createNote = async (values: z.infer<typeof NoteFormSchema>) => {
  try {
    const newNote = await prisma.notes.create({
      data: {
        issue: values.issue,
        content: values.content,
      },
    });

    return newNote;
  } catch (error) {
    console.error('Error creating note', error);
    return null;
  }
};

export const readNote = async (id: number) => {
  try {
    const note = await prisma.notes.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  } catch (error) {
    console.error('Error reading note', error);
    return null;
  }
};

export const readNotes = async () => {
  try {
    const allNotes = await prisma.notes.findMany();
    return allNotes;
  } catch (error) {
    console.error('Error reading notes', error);
    return null;
  }
};

export const updateNote = async (
  note: z.infer<typeof NoteFormSchema> & { id: number },
) => {
  try {
    const updatedNote = await prisma.notes.update({
      where: {
        id: note.id,
      },
      data: {
        issue: note.issue,
        content: note.content,
      },
    });

    return updatedNote;
  } catch (error) {
    console.error('Error updating note', error);
    return null;
  }
};

export const deleteNote = async (id: number) => {
  try {
    const deletedNote = await prisma.notes.delete({
      where: {
        id: id,
      },
    });

    return deletedNote;
  } catch (error) {
    console.error('Error deleting note', error);
    return null;
  }
};
