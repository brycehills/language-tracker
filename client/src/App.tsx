import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SessionForm from "./SessionForm";
import SessionList from "./SessionList";
import StudyGraph from "./components/StudyGraph";
import useAuth from "./AuthContext";
import LoginForm from "./LoginForm";


export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">📚 Language Study Tracker</h1>
        <p className="text-gray-600 mt-2">Track your language learning progress</p>
      </header>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-md h-[400px] overflow-y-auto">
          <SessionList />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <StudyGraph />
        </div>
      </div>

      {/* Form at bottom */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <SessionForm />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
