import { useState } from 'react';
import useAuth from './AuthContext';
import type { Session } from './types';
import ReactMarkdown from 'react-markdown';

export default function Suggestions({ session }: { session: Session }) {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchSuggestions = async () => {
    setLoading(true);
    setSuggestion('');
    const res = await fetch('http://localhost:3000/api/gpt/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ session }),
    });
    const data = await res.json();
    setSuggestion(data.suggestions || 'No suggestion found.');
    setLoading(false);
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-400 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-3">
        <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-700">AI Study Suggestions</h3>
      </div>
      <p className="mb-4 text-gray-600">
        Click the button below to get personalized study suggestions based on your most recent session.
      </p>
      <button
        onClick={fetchSuggestions}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
      </button>
      {suggestion && (
        <div className="mt-6 bg-white border border-blue-100 rounded-lg p-4 shadow-inner max-h-[20rem] overflow-y-auto">
          <div className="prose prose-blue">
            <ReactMarkdown>{suggestion}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}