const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

const usersFile = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8') || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Регистрация
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Введите имя и пароль' });

  const users = getUsers();
  if (users.find(u => u.username === username)) return res.status(400).json({ message: 'Такой пользователь уже существует' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  res.json({ message: 'Регистрация успешна!' });
});

// Логин
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Введите имя и пароль' });

  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Пользователь не найден' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

  res.json({ message: `Добро пожаловать, ${username}!` });
});

app.listen(PORT, () => console.log(`✅ Сервер запущен: http://localhost:${PORT}`));
