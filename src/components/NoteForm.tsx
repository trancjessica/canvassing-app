'use client';

import { useState } from 'react';

interface NoteFormProps {
  onSubmit: (name: string, notes: string) => void;
}

/**
 * NoteForm component for adding new canvassing notes.
 */
export function NoteForm({ onSubmit }: NoteFormProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {

    // Prevent browswer from reloading page on submit 
    e.preventDefault();

    // Use trim to remove trailing whitespaces
    if (name.trim() && notes.trim()) {
      onSubmit(name, notes);

      // Clear form fields after submission
      setName('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter resident's name"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Write your interaction notes here..."
            rows={4}
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
      >
        Add Note
      </button>
    </form>
  );
}