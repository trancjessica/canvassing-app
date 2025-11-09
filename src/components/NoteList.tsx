import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

/**
* NoteList component for displaying a list of canvassing notes.
 */
export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {notes.map((note) => (
        <div
          key={note.id}
          className="group rounded-lg bg-white p-6 transition-all hover:bg-gray-50"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{note.name}</h3>
              {note.email && (
                <p className="mt-1 text-sm text-gray-500">{note.email}</p>
              )}
            </div>
            <time className="text-sm text-gray-500">
              {new Date(note.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          <p className="mt-2 text-gray-700">{note.notes}</p>
          <p className="mt-2 text-xs text-gray-500">
            {new Date(note.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
      ))}
    </div>
  );
}