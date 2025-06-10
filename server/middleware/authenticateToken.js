// server/middleware/authenticateToken.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Load env variables

const SECRET_KEY = process.env.JWT_SECRET;

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('✅ Received token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('❌ Invalid or expired token');
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    console.log('✅ Token verified. User:', user);
    req.user = user;
    next();
  });
}
