const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

// Get users
app.get('/users', async (req, res) => {
  const query = `SELECT * FROM users`;

  try {
    const result = await pool.query(query);
    console.log('Users retrieved');

    res.status(200).json({
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error retrieving users',
      error: err.message,
    });
  }
});

// Create user
app.post('/users/new', async (req, res) => {
  const { name, phoneNumber, email, color } = req.body;
  const values = [name];
  let query = `INSERT INTO users (name`;

  if (phoneNumber !== undefined) {
    query += `, phoneNumber`;
    values.push(phoneNumber);
  }
  if (email !== undefined) {
    query += `, email`;
    values.push(email);
  }
  if (color !== undefined) {
    query += `, color`;
    values.push(color);
  }

  query += `) VALUES ($1`;
  for (let i = 2; i <= values.length; i++) {
    query += `, $${i}`;
  }
  query += `) RETURNING *`;

  try {
    const result = await pool.query(query, values);
    console.log('Data saved');
    console.log(result.rows[0]);

    res.status(201).json({
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating user',
      error: err.message,
    });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();

    res.status(200).json({
      message: 'Task retrieved successfully',
      data: tasks,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Error getting tasks',
      error: err.message,
    });
  }
});

// Create task
app.post('/tasks/new', async (req, res) => {
  const { title, status, executors_ids, priority, description, deadline, pinned, time_spent } = req.body;
  const values = [title];
  let query = `INSERT INTO tasks (title`;

  if (status !== undefined) {
    query += `, status`;
    values.push(status);
  }
  if (executors_ids !== undefined) {
    query += `, executors_ids`;
    values.push(executors_ids);
  }
  if (priority !== undefined) {
    query += `, priority`;
    values.push(priority);
  }
  if (description !== undefined) {
    query += `, description`;
    values.push(description);
  }
  if (deadline !== undefined) {
    query += `, deadline`;
    values.push(deadline);
  }
  if (pinned !== undefined) {
    query += `, pinned`;
    values.push(pinned);
  }
  if (time_spent !== undefined) {
    query += `, time_spent`;
    values.push(time_spent);
  }

  query += `) VALUES ($1`;
  for (let i = 2; i <= values.length; i++) {
    query += `, $${i}`;
  }
  query += `) RETURNING *`;

  try {
    const result = await pool.query(query, values);
    console.log('Data saved');
    console.log(result.rows[0]);

    res.status(201).json({
      message: 'Task created successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error creating task',
      error: err.message,
    });
  }
});

// Get one task
app.get('/tasks/:id', async (req, res) => {
  const query = `SELECT * FROM tasks WHERE id = ${req.params.id}`;

  try {
    const result = await pool.query(query);
    console.log('Task retrieved');
    console.log(result.rows);

    res.status(200).json({
      message: 'Task retrieved successfully',
      data: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Error getting task',
      error: err.message,
    });
  }
});

// Update task
app.put('/tasks/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status, priority, executors_ids, description, deadline, pinned, time_spent } = req.body;

  let updateFields = [];
  let values = [];
  let valueIndex = 1;

  if (title !== undefined) {
    updateFields.push(`title = $${valueIndex++}`);
    values.push(title);
  }
  if (status !== undefined) {
    updateFields.push(`status = $${valueIndex++}`);
    values.push(status);
  }
  if (priority !== undefined) {
    updateFields.push(`priority = $${valueIndex++}`);
    values.push(priority);
  }
  if (executors_ids !== undefined) {
    updateFields.push(`executors_ids = $${valueIndex++}`);
    values.push(executors_ids);
  }
  if (description !== undefined) {
    updateFields.push(`description = $${valueIndex++}`);
    values.push(description);
  }
  if (deadline !== undefined) {
    updateFields.push(`deadline = $${valueIndex++}`);
    values.push(deadline);
  }
  if (pinned !== undefined) {
    updateFields.push(`pinned = $${valueIndex++}`);
    values.push(pinned);
  }
  if (time_spent !== undefined) {
    updateFields.push(`time_spent = $${valueIndex++}`);
    values.push(time_spent);
  }
  updateFields.push(`last_edit = $${valueIndex++}`);
  values.push(new Date());

  values.push(id);

  if (updateFields.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  const query = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = $${valueIndex} RETURNING *`;

  try {
    const result = await pool.query(query, values);
    console.log('Task updated');

    res.status(200).json({ message: 'Task updated successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete task
app.delete('/tasks/delete/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    const updatedTasks = await getTasks();

    res.status(200).json({
      message: 'Task deleted successfully',
      data: updatedTasks,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Error deleting or getting updated tasks',
      error: err.message,
    });
  }
});

async function getTasks() {
  const query = 'SELECT * FROM tasks';
  const result = await pool.query(query);
  console.log('Tasks received');
  return result.rows;
}

async function editTask(newTaskData) {
  const query = 'SELECT * FROM tasks';
  const result = await pool.query(query);
  console.log('Tasks received');
  return result.rows;
}

async function deleteTask(id) {
  const query = 'DELETE FROM tasks WHERE id = $1';
  await pool.query(query, [id]);
  console.log('Task deleted');
}

app.listen(4000);
