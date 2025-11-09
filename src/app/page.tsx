'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NoteForm } from '@/components/NoteForm';


/**
 * Main Home component rendering the canvassing notes page.
 */
export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddNote = async (name: string, email: string | null, noteContent: string) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, notes: noteContent }),
      });

      if (!res.ok) throw new Error('Failed to create note');
      
      // Navigate to notes list after successful creation
      router.push('/notes');
    } catch (err: any) {
      setError(err.message || 'Failed to add note');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Add New Note</h1>
          <Link
            href="/notes"
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
          >
            View All Notes
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}
          
          <NoteForm onSubmit={handleAddNote} isSubmitting={isSubmitting} />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          View all your canvassing notes in the{" "}
          <Link href="/notes" className="text-blue-500 hover:text-blue-600">
            notes list
          </Link>
        </div>
      </main>
    </div>
  );
}