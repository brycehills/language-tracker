import { useState } from 'react';

export default function SessionForm() {

    // state var to store user typed info
    const [formData, setFormData] = useState({
        language: '',
        minutes: '',
        date: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // add post request to backend api/sessions
        const response = await fetch('http://localhost:3000/api/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //json object stored in body to be parsed later
              ...formData,
              minutes: Number(formData.minutes), //conv to str
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Session saved:', data);
            alert('Session saved successfully!');
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
                type="number"
                name="minutes"
                placeholder="Minutes"
                value={formData.minutes}
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
              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Session
              </button>
            </form>
          );
        }
