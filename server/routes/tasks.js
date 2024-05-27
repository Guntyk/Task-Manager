const express = require('express');
const router = express.Router();
const pool = require('../database');
const { addOptionalField } = require('../helpers/addOptionalField');

router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json({ message: 'Tasks retrieved successfully', data: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
  }
});

router.post('/new', async (req, res) => {
  let query = `INSERT INTO tasks (`;

  const [newQuery, values] = addOptionalField(req.body, query);

  try {
    const result = await pool.query(newQuery, values);
    res.status(201).json({ message: 'Task created successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    res.status(200).json({ message: 'Task retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving task', error: err.message });
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;

  let updateFields = [];
  let values = [];
  let valueIndex = 1;

  for (let key in req.body) {
    if (req.body[key] !== undefined) {
      updateFields.push(`${key} = $${valueIndex++}`);
      values.push(req.body[key]);
    }
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  updateFields.push(`last_edit = $${valueIndex}`);
  values.push(new Date());
  values.push(id);

  const query = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = $${valueIndex + 1} RETURNING *`;

  try {
    const result = await pool.query(query, values);
    res.status(200).json({ message: 'Task updated successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
    const updatedTasks = await getTasks();
    res.status(200).json({ message: 'Task deleted successfully', data: updatedTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting or getting updated tasks', error: err.message });
  }
});

async function getTasks() {
  const query = 'SELECT * FROM tasks';
  const result = await pool.query(query);
  return result.rows;
}

module.exports = router;
