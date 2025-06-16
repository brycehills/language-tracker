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

const handleLogout = () => {
  logout();
};

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
            <div className="flex justify-end p-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow"
      >Logout
      </button>
    </div>
      <div className="max-w-6xl mx-auto space-y-10 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-indigo-600 tracking-tight flex justify-center items-center gap-3">
            📚 Language Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Visualize your progress and stay on top of your language learning goals!
          </p>
        </div>



        {/* Graph at top center */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Study Activity</h2>
          <StudyGraph sessions={sessions} />
        </div>

        {/* Form and List side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Session</h2>
            <SessionForm onSessionSaved={fetchSessions} sessions={sessions} />
          </div>

          <div className="flex-1 overflow-y-auto bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Study Session List</h2>
            <SessionList sessions={sessions} />
          </div>
        </div>
      </div>

    </div>
  );
}