import SessionForm from './SessionForm';
import SessionList from './SessionList';

function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 Language Tracker</h1>
      <SessionForm />
      <div className="mt-8">
        <SessionList />
      </div>
    </div>
  );
}

export default App;
