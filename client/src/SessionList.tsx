import { useEffect, useState } from 'react';


// what this object should look like - same as the input formdata
type Session = {
  id: number;
  language: string;
  minutes: number;
  date: string;
  notes?: string;
};

//define fxn
export default function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([]);


  // get data from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/sessions')
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error('Error fetching sessions:', err));
  }, []);


  //display front end - app.tsx - 
  // *** loop over session using map to iterate DB
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Study Sessions</h2>
      <ul className="space-y-4">
        {sessions.map((session) => (
          <li key={session.id} className="p-4 border rounded-lg shadow">
            <p><strong>Language:</strong> {session.language}</p>
            <p><strong>Minutes:</strong> {session.minutes}</p>
            <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
            {session.notes && <p><strong>Notes:</strong> {session.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
