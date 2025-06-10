// MainPage.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './AuthContext';
import SessionForm from './SessionForm';
import SessionList from './SessionList';
import StudyGraph from './components/StudyGraph';
import type { Session } from './types'; // <-- Add this line

export default function MainPage() {
  const { token, logout } = useAuth(); // <-- get logout from context
  const [sessions, setSessions] = useState<Session[]>([]); // <-- Add type here

  const fetchSessions = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/sessions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  useEffect(() => {
    if (token) fetchSessions();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <SessionForm onSessionSaved={fetchSessions} sessions={sessions} />
      <SessionList sessions={sessions} />
      <StudyGraph sessions={sessions} />
    </div>
  );
}