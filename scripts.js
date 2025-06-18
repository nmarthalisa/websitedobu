// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

// Timetable filtering
document.addEventListener('DOMContentLoaded', () => {
  const timetableTable = document.querySelector('#timetable-table tbody');
  const martialArtFilter = document.querySelector('#martial-art-filter');
  const timeFilter = document.querySelector('#time-filter');

  // Sample timetable data (replace with API call)
  const timetableData = [
    { day: 'Monday', time: '18:00', martialArt: 'Jiu Jitsu', instructor: 'John Smith', price: '$20' },
    { day: 'Tuesday', time: '09:00', martialArt: 'Karate', instructor: 'Jane Doe', price: '$15' },
    { day: 'Wednesday', time: '19:00', martialArt: 'Judo', instructor: 'Mike Lee', price: '$18' },
  ];

  function renderTimetable(data) {
    timetableTable.innerHTML = '';
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.day}</td>
        <td>${item.time}</td>
        <td>${item.martialArt}</td>
        <td>${item.instructor}</td>
        <td>${item.price}</td>
        <td><button class="cta-button" aria-label="Book ${item.martialArt} class">Book</button></td>
      `;
      timetableTable.appendChild(row);
    });
  }

  function filterTimetable() {
    const martialArt = martialArtFilter.value;
    const time = timeFilter.value;
    let filteredData = timetableData;

    if (martialArt !== 'all') {
      filteredData = filteredData.filter(item => item.martialArt.toLowerCase() === martialArt);
    }
    if (time !== 'all') {
      filteredData = filteredData.filter(item => {
        const hour = parseInt(item.time.split(':')[0]);
        return time === 'morning' ? hour < 12 : hour >= 12;
      });
    }

    renderTimetable(filteredData);
  }

  if (timetableTable) {
    renderTimetable(timetableData);
    martialArtFilter.addEventListener('change', filterTimetable);
    timeFilter.addEventListener('change', filterTimetable);
  }

  // Login form validation
  const loginForm = document.querySelector('#login-form form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const emailError = document.querySelector('#email-error');
      const passwordError = document.querySelector('#password-error');

      emailError.textContent = '';
      passwordError.textContent = '';

      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          document.querySelector('#login-form').classList.add('hidden');
          document.querySelector('#dashboard').classList.remove('hidden');
          document.querySelector('#user-name').textContent = data.user.name;
          document.querySelector('#membership-status').textContent = data.user.membership;
          // Fetch and display upcoming classes and payment history via API
        } else {
          emailError.textContent = data.message || 'Invalid credentials';
        }
      } catch (error) {
        emailError.textContent = 'Error connecting to server';
      }
    });
  }
});