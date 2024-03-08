'use client';

import { DeleteNote } from '@/app/actions/NoteActions/NoteActions';
import { notes } from '@prisma/client';
import { Delete } from 'lucide-react';

type NoteListProps = {
  notes: notes[];
  setNotesPreview: (notes: notes) => void;
};

export const NoteList = ({ notes, setNotesPreview }: NoteListProps) => {
  const handleDelete = async (id: number) => {
    await DeleteNote(id);
  };
  return (
    <div className={`flex w-60 flex-col gap-4 overflow-y-auto p-4 shadow-md`}>
      {notes.map(note => {
        return (
          <div
            key={note.id}
            className={`relative flex cursor-pointer flex-col gap-2 rounded-md p-4 shadow-md hover:bg-gray-100 hover:shadow-lg`}
            onClick={() => setNotesPreview(note)}
          >
            <button
              onClick={() => handleDelete(note.id)}
              className={`absolute right-2 top-2 cursor-pointer text-red-500 hover:text-red-400`}
            >
              <Delete />
            </button>

            <h2>{note.issue}</h2>
            <p>{note.content}</p>
          </div>
        );
      })}
    </div>
  );
};
