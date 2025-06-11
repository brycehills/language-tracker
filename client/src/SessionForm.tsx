import useAuth from './AuthContext';
import { useState } from 'react';
import type { Session } from './types'; // adjust path if needed

interface Props {
  onSessionSaved: () => Promise<void>;
  sessions: Session[];
}

export default function SessionForm({ onSessionSaved, sessions }: Props) {
  const [formData, setFormData] = useState({
    language: '',
    reading_minutes: '',
    writing_minutes: '',
    listening_minutes: '',
    speaking_minutes: '',
    date: '',
    notes: '',
  });

  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        reading_minutes: Number(formData.reading_minutes),
        writing_minutes: Number(formData.writing_minutes),
        listening_minutes: Number(formData.listening_minutes),
        speaking_minutes: Number(formData.speaking_minutes),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Session saved:', data);
      alert('Session saved successfully!');

      setFormData({
        language: '',
        reading_minutes: '',
        writing_minutes: '',
        listening_minutes: '',
        speaking_minutes: '',
        date: '',
        notes: '',
      });

      onSessionSaved();
    } else {
      alert('Failed to save session.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="text"
        name="language"
        placeholder="Language"
        value={formData.language}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="reading_minutes"
        placeholder="Reading Minutes"
        value={formData.reading_minutes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="writing_minutes"
        placeholder="Writing Minutes"
        value={formData.writing_minutes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="listening_minutes"
        placeholder="Listening Minutes"
        value={formData.listening_minutes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="speaking_minutes"
        placeholder="Speaking Minutes"
        value={formData.speaking_minutes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Entry
      </button>
    </form>
  );
}
