const express = require('express');
const cors = require('cors');
const timetableRoutes = require('./routes/timetable');
const userRoutes = require('./routes/users');
const { sequelize } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/timetable', timetableRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});