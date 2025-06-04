import { useEffect, useState } from 'react';


// what this object should look like - same as the input formdata
type Session = {
  id: number;
  date: string;
  language: string;
  reading_minutes:number;
  writing_minutes: number;
  listening_minutes:number;
  speaking_minutes:number;
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
