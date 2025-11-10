'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SiteHeaderProps {
  title?: string;
}

/**
 * Responsive site header with brand and navigation links.
 */
export function SiteHeader({ title = 'Canvassing Connect' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          {title}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-blue-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/learn"
            className="hover:text-blue-100 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/notes"
            className="hover:text-blue-100 transition-colors"
          >
            Notes
          </Link>
          <Link
            href="/notes/new"
            className="hover:text-blue-100 transition-colors"
          >
            Add Note
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-blue-700/30 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700/90 backdrop-blur-sm text-center py-4 space-y-3 text-sm font-medium">
          <Link
            href="/"
            className="block hover:text-blue-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/learn"
            className="block hover:text-blue-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Learn More
          </Link>
          <Link
            href="/notes"
            className="block hover:text-blue-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Notes
          </Link>
          <Link
            href="/notes/new"
            className="block hover:text-blue-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Add Note
          </Link>
        </div>
      )}
    </header>
  );
}
