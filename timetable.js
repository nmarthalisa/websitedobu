const express = require('express');
const router = express.Router();

const timetableData = [
  { id: 1, day: 'Monday', time: '18:00', martialArt: 'Jiu Jitsu', instructor: 'John Smith', price: '$20' },
  { id: 2, day: 'Tuesday', time: '09:00', martialArt: 'Karate', instructor: 'Jane Doe', price: '$15' },
  { id: 3, day: 'Wednesday', time: '19:00', martialArt: 'Judo', instructor: 'Mike Lee', price: '$18' },
];

router.get('/', (req, res) => {
  res.json(timetableData);
});

module.exports = router;