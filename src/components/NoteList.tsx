'use client';

import { useState } from 'react';
import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  async function handleSave(noteId: string) {
    const res = await fetch('/api/notes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId, notes: editText }),
    });

    if (res.ok) {
      window.location.reload(); // quick refresh for demo; could refetch notes instead
    } else {
      alert('Error saving note');
    }
  }

  return (
    <div className="divide-y divide-gray-200">
      {notes.map((note) => {
        const created = new Date(note.timestamp);
        const updated = note.updatedAt ? new Date(note.updatedAt) : null;
        const wasEdited =
          updated && updated.getTime() !== created.getTime();

        return (
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
                {created.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            {editingId === note.id ? (
              <div className="mt-3">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleSave(note.id)}
                    className="rounded bg-blue-600 px-3 py-1 text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded bg-gray-200 px-3 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 text-gray-700">{note.notes}</p>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <p>
                    {created.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                    {wasEdited && updated && (
                      <span className="ml-2 italic">
                        (Last edited{' '}
                        {updated.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                        )
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setEditingId(note.id);
                      setEditText(note.notes);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
