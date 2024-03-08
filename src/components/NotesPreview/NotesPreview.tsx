'use client';

import { notes } from '@prisma/client';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

type NotesPreviewProps = {
  notesPreview?: notes;
};

export default function NotesPreview({ notesPreview }: NotesPreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `Issue: ${notesPreview?.issue}\nNotes: ${notesPreview?.content}`,
    );
  };

  return (
    <div className={`flex w-60 flex-col justify-between gap-4 p-4 shadow-md`}>
      <div>
        <h2>Preview</h2>
        <div className={`flex flex-col gap-4`}>
          <div className="space-y-2">
            <Label>Issue</Label>
            <p
              className={`h-10 rounded-md border border-input bg-background px-3 py-2 text-sm`}
            >
              {notesPreview?.issue}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <p
              className={`min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm`}
            >
              {notesPreview?.content}
            </p>
          </div>
        </div>
      </div>
      <Button onClick={copyToClipboard}>Copy</Button>
    </div>
  );
}
