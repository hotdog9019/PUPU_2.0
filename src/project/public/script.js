const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const message = document.getElementById('message');

async function sendRequest(url, data) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Ошибка сервера' }));
      throw new Error(errData.message || 'Ошибка сервера');
    }
    return res.json();
  } catch (err) {
    return { message: err.message };
  }
}

loginBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!username || !password) return showMessage('Введите имя и пароль', 'red');

  const result = await sendRequest('/api/login', { username, password });
  if (result.message.includes('Добро')) {
    localStorage.setItem('loggedUser', username); 
    window.location.href = 'visit.html';
  } else {
    showMessage(result.message, 'red');
  }
});

registerBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!username || !password) return showMessage('Введите имя и пароль', 'red');

  const result = await sendRequest('/api/register', { username, password });
  if (result.message.includes('успешна')) {
     localStorage.setItem('loggedUser', username);
    window.location.href = 'visit.html'; 
  } else {
    showMessage(result.message, 'red');
  }
});

function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
