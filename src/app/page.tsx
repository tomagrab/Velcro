import DisplayFormAndNotePreview from '@/components/Layout/DisplayFormAndNotePreview/DisplayFormAndNotePreview';
import { readNotes } from '@/db/prisma';

export default async function Home() {
  const notes = await readNotes();
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <DisplayFormAndNotePreview notes={notes} />
    </main>
  );
}
