import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type Session = {
  id: number;
  language: string;
  date: string;
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
};

export default function StudyGraph() {
  const [data, setData] = useState<Session[]>([]);

useEffect(() => {
  fetch('http://localhost:3000/api/sessions')
    .then((res) => res.json())
    .then((fetchedData) => { //what we get from API
      const formattedData = fetchedData.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date).toISOString().slice(0, 10), // better display format date
      }));
      setData(formattedData); // sending back formatted data
    })
    .catch((err) => console.error('Error fetching session data:', err));
}, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="reading_minutes" stroke="#8884d8" name="Reading" />
        <Line type="monotone" dataKey="writing_minutes" stroke="#82ca9d" name="Writing" />
        <Line type="monotone" dataKey="listening_minutes" stroke="#ffc658" name="Listening" />
        <Line type="monotone" dataKey="speaking_minutes" stroke="#ff7300" name="Speaking" />
        </LineChart>
    </ResponsiveContainer>
  );
}
