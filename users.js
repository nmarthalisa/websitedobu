const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Use bcrypt instead of Argon2 for simplicity
const jwt = require('jsonwebtoken');

const users = []; // In-memory storage (replace with PostgreSQL in production)

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashedPassword, name, membership: 'Basic' };
  users.push(user);
  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token, user: { name: user.name, membership: user.membership } });
});

module.exports = router;