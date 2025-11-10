'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';

/**
 * Learn Page component rendering information about the app.
 */
export default function Learn() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learn more about Canvassing Connect</h1>
          <p className="text-gray-700 mb-6">
            Canvassing Connect is designed to help volunteers and organizers keep track of their canvassing efforts. 
            You can easily add notes about your interactions, view past notes, and manage your canvassing data all in one place.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Add detailed notes about each canvassing interaction.</li>
            <li>View and manage all your notes in one organized location.</li>
            <li>[Coming soon] Collaborate with team members by sharing notes.</li>
            <li>Access your data from anywhere, on any device.</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
