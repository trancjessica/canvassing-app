'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Canvassing Connect
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Canvassing Connect helps volunteers and organizers easily log, manage, and share notes from field
          interactions. Whether you’re running a local campaign or community outreach effort, this tool keeps
          your conversations organized and accessible in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/notes/new"
            className="rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Add a New Note
          </Link>

          <Link
            href="/notes"
            className="rounded-md bg-gray-100 px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            View All Notes
          </Link>
        </div>

        <section className="mt-16 text-gray-500 text-sm">
          Built with Next.js and a passion for civic tech.
        </section>
      </main>
    </div>
  );
}
