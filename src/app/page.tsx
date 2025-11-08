'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/types/note';
import { NoteForm } from '@/components/NoteForm';
import { NoteList } from '@/components/NoteList';

/**
 * Main Home component rendering the canvassing notes page.
 */
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle adding a new note
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch notes from the API endpoint
      const res = await fetch('/api/notes');

      if (!res.ok) throw new Error('Failed to fetch notes');

      // Parse the JSON response
      const data: Note[] = await res.json();

      // Update state with fetched notes
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to handle adding a new note
  const handleAddNote = async (name: string, noteContent: string) => {
    setError(null);
    try {
      // Send POST request to create a new note
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, notes: noteContent }),
      });

      if (!res.ok) throw new Error('Failed to create note');

      // Get the created note from the response
      const created: Note = await res.json();

      // Update notes list with the newly created note
      setNotes((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err.message || 'Failed to add note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="mx-auto max-w-2xl space-y-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Canvassing Notes</h1>
        <NoteForm onSubmit={handleAddNote} />
        <NoteList notes={notes} />
      </main>
    </div>
  );
}