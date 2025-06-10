
type SessionListProps = {
  sessions: Session[];
};

export default function SessionList({ sessions }: SessionListProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Study Entries</h2>
      <ul className="space-y-4">
        <div className='h-64 overflow-y-auto border p-4 rounded-xl shadow-md'>
        {sessions.map((session) => (
          <li key={session.id} className="p-4 border rounded-lg shadow">
            <p><strong>Language:</strong> {session.language}</p>
            <p><strong>Reading Time:</strong> {session.reading_minutes}</p>
            <p><strong>Writing Time:</strong> {session.writing_minutes}</p>
            <p><strong>Listening Time:</strong> {session.listening_minutes}</p>
            <p><strong>Speaking Time:</strong> {session.speaking_minutes}</p>
            <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
            {session.notes && <p><strong>Notes:</strong> {session.notes}</p>}
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
}

// If you don't have a shared Session type, keep this in the file:
export type Session = {
  id: number;
  date: string;
  language: string;
  reading_minutes: number;
  writing_minutes: number;
  listening_minutes: number;
  speaking_minutes: number;
  notes?: string;
};
