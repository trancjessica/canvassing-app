'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/types/note';
import { NoteList } from '@/components/NoteList';
import Link from 'next/link';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/notes');
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Canvassing Notes</h1>
          <Link
            href="/"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Add New Note
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 text-center text-red-800">
            {error}
          </div>
        ) : notes.length > 0 ? (
          <div className="space-y-6">
            <NoteList notes={notes} />
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">
            No notes yet. Create your first note to get started!
          </div>
        )}
      </main>
    </div>
  );
}