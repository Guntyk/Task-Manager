const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const users = require('./constants/users.json');
const tasks = require('./constants/tasks.json');

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.get('/users', (req, res) => {
  setTimeout(() => {
    res.send(users);
  }, 3000);
});

app.get('/tasks', (req, res) => {
  setTimeout(() => {
    res.send(tasks);
  }, 3000);
});

app.listen(3005);
