const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'tasksdb',
});

db.connect((error) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log('MySQL connected...');
});

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

// Get users
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  let query = db.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    setTimeout(() => {
      res.send(results);
    }, 1000);
  });
});

// Get tasks
app.get('/tasks', (req, res) => {
  let sql = 'SELECT * FROM tasks';
  let query = db.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    setTimeout(() => {
      res.send(results);
    }, 1000);
  });
});

// Create task
app.post('/tasks/new', (req, res) => {
  let sql = 'INSERT INTO tasks SET ?';
  db.query(sql, req.body, (error, result) => {
    if (error) {
      throw error;
    }
    db.query('SELECT * FROM tasks', (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    });
  });
});

// Get one task
app.get('/tasks/:id', (req, res) => {
  let sql = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
  let query = db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send('Task fetched...');
    res.send(result.title);
  });
});

// Update task
app.get('/tasks/update/:id', (req, res) => {
  let newTitle = 'Updated Title 35';
  let sql = `UPDATE tasks SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.send('Task updated...');
  });
});

// Delete task
app.delete('/tasks/delete/:id', (req, res) => {
  let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    db.query('SELECT * FROM tasks', (error, results) => {
      if (error) {
        throw error;
      }
      setTimeout(() => {
        res.send(results);
      }, 500);
    });
  });
});

app.listen(3005);
