'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import { NoteList } from '@/components/NoteList/NoteList';
import NotesPreview from '@/components/NotesPreview/NotesPreview';
import { Separator } from '@/components/ui/separator';
import { notes } from '@prisma/client';
import { useState } from 'react';

type DisplayFormAndNotePreviewProps = {
  notes: notes[] | null;
};

export default function DisplayFormAndNotePreview({
  notes,
}: DisplayFormAndNotePreviewProps) {
  const [notesPreview, setNotesPreview] = useState<notes | null>(
    notes && notes.length > 0 ? notes[0] : null,
  );

  const handleSetNotesPreview = (notes: notes) => {
    setNotesPreview(notes);
  };

  return (
    <div className={`flex flex-col gap-4 md:flex-row`}>
      {notes && notes.length > 0 ? (
        <>
          <NoteList notes={notes} setNotesPreview={setNotesPreview} />
          <Separator orientation="vertical" />
        </>
      ) : null}

      <NoteForm
        notesPreview={notesPreview}
        handleSetNotesPreview={handleSetNotesPreview}
      />

      {notesPreview ? (
        <>
          <Separator orientation="vertical" className={`shadow-md`} />
          <NotesPreview notesPreview={notesPreview} />
        </>
      ) : null}
    </div>
  );
}
