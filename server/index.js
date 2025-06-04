import express from 'express';  // express framework
import cors from 'cors';        // middleware - cross origin reqs

import pool from './db.js';     // same folder - config

const app = express();          // create express object

app.use(cors());                // enable cors wfor app
app.use(express.json());        // parse incoming requsts with json


/* ----------------GET REQUESTS ---------------*/
// get route at root path - 
app.get('/', (req, res) => {
    res.send('Backend is running~'); //confirm server is running test
});

// New route to get all language entries
app.get('/api/languages', (req, res) => {
res.json(languageEntries); // Responds with the array of language entries in JSON format
});

app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ dbTime: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  // sessions get endpoint
  app.get('/api/sessions', async (req,res) => {
    try{
    const result = await pool.query('SELECT * FROM study_sessions ORDER BY date DESC');
    res.json(result.rows);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
    }
  });

/* ----------------POST REQUESTS ---------------*/
app.post('/api/sessions', async (req,res) => {

    // req body attributes
    const { language, 
            date, 
            notes, 
            reading_minutes = 0, 
            writing_minutes = 0, 
            listening_minutes = 0, 
            speaking_minutes = 0,
          } = req.body;

    // error checking for missing data - cant insert null
    if (!language || !date){
        return res.status(400).json({error: 'language and date are required.'});
    }

    // otherwiser perform insert into 
    try {
      const result = await pool.query(
        `INSERT INTO study_sessions
        (language, date, notes, reading_minutes, writing_minutes, listening_minutes, speaking_minutes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [language, date, notes || null, reading_minutes, writing_minutes, listening_minutes, speaking_minutes]
      );
      res.status(201).json({ session: result.rows[0] });
    } catch (error) {
      console.error('Insert error:', error);
      res.status(500).json({ error: 'Database error' });
    }
});



const PORT = process.env.PORT || 3000;

// listen on port
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });


