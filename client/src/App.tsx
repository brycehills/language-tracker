import SessionForm from './SessionForm';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Language Study Tracker
        </h1>
        <SessionForm />
      </div>
    </div>
  );
}

export default App;
