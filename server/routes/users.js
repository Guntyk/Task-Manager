const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json({ message: 'Users retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

router.post('/new', async (req, res) => {
  let query = `INSERT INTO users (`;

  const [newQuery, values] = addOptionalField(req.body, query);

  try {
    const result = await pool.query(newQuery, values);
    res.status(201).json({ message: 'User created successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
