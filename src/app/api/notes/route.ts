import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
* GET /api/notes - Retrieve all notes
 */
export async function GET() {
  // Fetch notes from the database, ordered by timestamp descending
  const notes = await prisma.note.findMany({ orderBy: { timestamp: 'desc' } });

  const payload = notes.map((n) => ({
    id: n.id,
    name: n.name,
    notes: n.notes,
    timestamp: n.timestamp.toISOString(),
  }));

  return NextResponse.json(payload);
}

/**
 * POST /api/notes - Create a new note
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, notes } = body;
    if (!name || !notes) {
      // Return 400 if name or notes is missing
      return new NextResponse(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Create the new note in the database
    const created = await prisma.note.create({
      data: {
        name,
        notes,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      id: created.id,
      name: created.name,
      notes: created.notes,
      timestamp: created.timestamp.toISOString(),
    });
  } catch (err) {
    console.error(err);
    // Return 500 if an unexpected error occurs
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
