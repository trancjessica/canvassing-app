'use client';

import Link from 'next/link';

interface SiteHeaderProps {
  title?: string;
  subtitle?: string;
}

/**
 * Reusable site header component with clickable title.
 */
export function SiteHeader({
  title = 'Canvassing Connect',
  subtitle = 'Connecting communities, one conversation at a time',
}: SiteHeaderProps) {
  return (
    <header className="bg-blue-500 text-white py-10 shadow-md">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Link href="/" className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && (
            <span className="mt-2 text-lg text-blue-100">{subtitle}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
