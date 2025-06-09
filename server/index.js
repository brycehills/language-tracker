import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import authRoutes from './auth.js';
import authenticateToken from './middleware/authenticateToken.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes (register + login)
app.use('/api/auth', authRoutes);

/* -------------------- GET Routes -------------------- */

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running~');
});

// Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ dbTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all sessions for the logged-in user
app.get('/api/sessions', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM study_sessions WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Sample fake data route
const languageEntries = [
  { id: 1, language: 'Japanese', studiedOn: '2025-05-27', notes: 'Reviewed JLPT N5 verbs' },
  { id: 2, language: 'Spanish', studiedOn: '2025-05-26', notes: 'Practiced irregular verbs' },
];
app.get('/api/languages', (req, res) => {
  res.json(languageEntries);
});

/* -------------------- POST Route -------------------- */

// Add new session for logged-in user
app.post('/api/sessions', authenticateToken, async (req, res) => {
  const {
    language,
    date,
    notes,
    reading_minutes = 0,
    writing_minutes = 0,
    listening_minutes = 0,
    speaking_minutes = 0,
  } = req.body;

  if (!language || !date) {
    return res.status(400).json({ error: 'language and date are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO study_sessions
       (language, date, notes, reading_minutes, writing_minutes, listening_minutes, speaking_minutes, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        language,
        date,
        notes || null,
        reading_minutes,
        writing_minutes,
        listening_minutes,
        speaking_minutes,
        req.user.id,
      ]
    );
    res.status(201).json({ session: result.rows[0] });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

/* -------------------- Start Server -------------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
