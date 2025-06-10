export type Session = {
  id: number;
  language: string;
  date: string;
  notes?: string;
  reading_minutes: number;
  writing_minutes: number;
  listening_minutes: number;
  speaking_minutes: number;
};