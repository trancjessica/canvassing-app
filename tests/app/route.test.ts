import { GET, POST, PUT, PATCH } from '@/app/api/notes/route';
import prisma from '@/lib/prisma';

describe('Notes API routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/notes', () => {
    it('returns all notes', async () => {
      const mockNotes = [
        { id: '1', name: 'Louie', email: 'louie@test.com', notes: 'Note 1', timestamp: new Date() },
        { id: '2', name: 'Luna', email: null, notes: 'Note 2', timestamp: new Date() },
      ];

      const mockFindMany = jest.fn();
      prisma.note.findMany = mockFindMany;
      mockFindMany.mockReturnValue(Promise.resolve(mockNotes));

      const res = await GET();
      const json = await res.json();

      expect(json.length).toBe(2);
      expect(json[0]).toHaveProperty('id', '1');
    });
  });

  describe('POST /api/notes', () => {
    it('creates a new note', async () => {
      const newNote = { name: 'Lloyd', email: 'lloyd@test.com', notes: 'Note 3' };
      const mockCreate = jest.fn();

      prisma.note.create = mockCreate;
      mockCreate.mockReturnValue(
        Promise.resolve({ id: '3', ...newNote, timestamp: new Date() })
      );

      const req = {
        json: () => Promise.resolve(newNote),
      } as Request;

      const res = await POST(req);
      const json = await res.json();

      expect(json).toHaveProperty('id', '3');
      expect(json).toHaveProperty('name', 'Lloyd');
    });
  });

  describe('PATCH /api/notes', () => {
    it('updates an existing note', async () => {
      const updatedNote = { id: '1', notes: 'Updated Note 1' };
      const mockUpdate = jest.fn();

      prisma.note.update = mockUpdate;
      mockUpdate.mockReturnValue(
        Promise.resolve({ id: '1', name: 'Khaki', email: 'khaki@test.com', notes: 'Updated Note 1', timestamp: new Date() })
      );    

      const req = {
        json: () => Promise.resolve(updatedNote),
      } as Request;

      const res = await PATCH(req);
      const json = await res.json();

      expect(json).toHaveProperty('id', '1');
      expect(json).toHaveProperty('notes', 'Updated Note 1');
    });
  }); 
});
