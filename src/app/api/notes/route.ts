import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/notes - Retrieve all notes
 */
export async function GET() {
  const notes = await prisma.note.findMany({ orderBy: { timestamp: 'desc' } });
  const payload = notes.map((n) => ({
    id: n.id,
    name: n.name,
    email: n.email,
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
    const { name, email, notes } = body;
    if (!name || !notes) {
      return new NextResponse(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const created = await prisma.note.create({
      data: {
        name,
        email: email || null,
        notes,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      id: created.id,
      name: created.name,
      email: created.email,
      notes: created.notes,
      timestamp: created.timestamp.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}

/**
 * PUT /api/notes - Replace an existing note entirely
 * Expected body: { id, name, email, notes }
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, notes } = body;
    if (!id || !name || !notes) {
      return new NextResponse(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const updated = await prisma.note.update({
      where: { id },
      data: { name, email, notes, timestamp: new Date() },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      notes: updated.notes,
      timestamp: updated.timestamp.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}

/**
 * PATCH /api/notes - Partially update an existing note
 * Expected body: { id, ...fieldsToUpdate }
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, notes } = body;
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Missing id' }), { status: 400 });
    }

    const updated = await prisma.note.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(notes && { notes }),
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      notes: updated.notes,
      timestamp: updated.timestamp.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
