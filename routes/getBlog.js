const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/getBlogs', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM blogsData');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
