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

// Define a type for each study session
type StudySession = {
  id: number;
  language: string;
  date: string;
  notes: string;
  reading_minutes: number;
  writing_minutes: number;
  listening_minutes: number;
  speaking_minutes: number;
};

export default function StudyGraph() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<StudySession[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Fetch all study sessions
  useEffect(() => {
    fetch("http://localhost:3000/api/sessions")
      .then((res) => res.json())
      .then((data: StudySession[]) => {

      // Format the date for each session
      const formatted = data.map((session) => ({
        ...session,
        date: new Date(session.date).toISOString().split("T")[0],
      }));

      // Sort by date
      const sorted = [...formatted].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

        setSessions(sorted);
        setFilteredSessions(sorted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Update filtered sessions when selected language changes
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

  // Get unique languages
  const languages = Array.from(new Set(sessions.map((s) => s.language)));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Study Activity Over Time</h2>

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
        <LineChart data={filteredSessions}>
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
    </div>
  );
}
