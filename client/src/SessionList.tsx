type SessionListProps = {
  sessions: Session[];
};

export default function SessionList({ sessions }: SessionListProps) {
  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Study Entries</h2> */}
      <ul className="space-y-4">
        <div className="h-[28rem] overflow-y-auto border p-4 rounded-xl shadow-md">
          {sessions.map((session) => (
            <li key={session.id} className="p-4 border rounded-lg shadow bg-gray-50">
              <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
                <dt className="font-semibold">Language:</dt>
                <dd>{session.language}</dd>
                <dt className="font-semibold">Reading:</dt>
                <dd>{session.reading_minutes} min</dd>
                <dt className="font-semibold">Writing:</dt>
                <dd>{session.writing_minutes} min</dd>
                <dt className="font-semibold">Listening:</dt>
                <dd>{session.listening_minutes} min</dd>
                <dt className="font-semibold">Speaking:</dt>
                <dd>{session.speaking_minutes} min</dd>
                <dt className="font-semibold">Date:</dt>
                <dd>{new Date(session.date).toLocaleDateString()}</dd>
                {session.notes && (
                  <>
                    <dt className="font-semibold">Notes:</dt>
                    <dd>{session.notes}</dd>
                  </>
                )}
              </dl>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

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
