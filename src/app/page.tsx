'use client';

import { useState } from 'react';
import { Note } from '@/types/note';
import { NoteForm } from '@/components/NoteForm';

/**
 * Main Home component rendering the canvassing notes page.
 */
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to handle adding a new note
  const handleAddNote = (name: string, notes: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      name,
      notes,
      timestamp: new Date().toISOString(),
    };
    // Keep track of notes in state
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="mx-auto max-w-2xl space-y-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Canvassing Notes</h1>
        <NoteForm onSubmit={handleAddNote} />
      </main>
    </div>
  );
}