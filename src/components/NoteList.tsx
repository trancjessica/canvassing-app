import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

/**
* NoteList component for displaying a list of canvassing notes.
 */
export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="w-full space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-md border border-gray-200 p-4 hover:border-gray-300"
        >
          <h3 className="font-medium text-gray-900">{note.name}</h3>
          <p className="mt-2 text-gray-800">{note.notes}</p>
          <p className="mt-2 text-sm text-gray-500">
            {new Date(note.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}