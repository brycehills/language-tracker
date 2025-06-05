import SessionForm from './SessionForm';
import SessionList from './SessionList';
import StudyGraph from './components/StudyGraph';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">📚 Language Tracker</h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <SessionForm />
          <SessionList />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">📈 Study Graph</h2>
          <StudyGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
