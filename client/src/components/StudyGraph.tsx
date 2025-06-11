import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Session } from '../types';

type StudyGraphProps = {
  sessions: Session[];
};

export default function StudyGraph({ sessions }: StudyGraphProps) {
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    if (selectedLanguage === "") {
      setFilteredSessions(sessions);
    } else {
      const filtered = sessions.filter(
        (session) => session.language === selectedLanguage
      );
      setFilteredSessions(filtered);
    }
  }, [selectedLanguage, sessions]);

  const languages = Array.from(new Set(sessions.map((s) => s.language)));

  // Sort sessions by date ascending (oldest first, newest last)
  const sortedSessions = [...filteredSessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-2">Study Activity Over Time</h2> */}
      <div className="mb-4">
        <label className="mr-2">Language:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedSessions}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reading_minutes" stroke="#8884d8" name="Reading" />
          <Line type="monotone" dataKey="writing_minutes" stroke="#82ca9d" name="Writing" />
          <Line type="monotone" dataKey="listening_minutes" stroke="#ffc658" name="Listening" />
          <Line type="monotone" dataKey="speaking_minutes" stroke="#ff7300" name="Speaking" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
