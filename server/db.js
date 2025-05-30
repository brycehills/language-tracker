// server/db.js
// purpose: connection module for DB - now we can query the database with this data
//          aka: this connection logic can be reused to query 
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'tracker_user',      // your db user
  host: 'localhost',
  database: 'language_tracker',
  password: 'yourpassword',
  port: 5432,                // default PostgreSQL port
});

export default pool;
