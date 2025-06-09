console.log("Incoming Token:", token);
jwt.verify(token, SECRET_KEY, (err, user) => {
  if (err) {
    console.log("JWT Verify Error:", err);
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }

  console.log("Decoded user from token:", user);
  req.user = user;
  next();
});
