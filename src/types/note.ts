/**
 * Note interface representing a canvassing interaction note.
 */
export interface Note {
  id: string;
  name: string;
  email?: string; // Optional email field
  notes: string;
  timestamp: string;
  updatedAt?: string; 
}