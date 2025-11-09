'use client';

import Link from 'next/link';

interface SiteHeaderProps {
  title?: string;
  subtitle?: string;
}

/**
 * Reusable site header component with title.
 */
export function SiteHeader({
  title = 'Canvassing Connect',
  subtitle = 'Connecting communities, one conversation at a time',
}: SiteHeaderProps) {
  return (
    <header className="bg-blue-500 text-white py-10 shadow-md">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-blue-100">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
