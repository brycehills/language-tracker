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

  // return (
  //   <div className="p-4">
  //     <div className="flex justify-end mb-4">
  //       <button
  //         onClick={logout}
  //         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //     <SessionForm onSessionSaved={fetchSessions} sessions={sessions} />
  //     <SessionList sessions={sessions} />
  //     <StudyGraph sessions={sessions} />
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Language Tracker Dashboard
        </h1>

        {/* Graph at top center */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Study Activity</h2>
          <StudyGraph sessions={sessions} />
        </div>

        {/* Form and List side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Session</h2>
            <SessionForm onSessionSaved={fetchSessions} sessions={sessions} />
          </div>

          <div className="flex-1 overflow-y-auto border p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Study Session List</h2>
            <SessionList sessions={sessions} />
          </div>
        </div>
      </div>
    </div>
  );
}