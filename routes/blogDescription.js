const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Adjust the path to your connection.js file

router.get('/getBlogByTitle/:title', async (req, res) => {
  const title = req.params.title;

  try {
    const [rows] = await connection.query('SELECT * FROM blogsData WHERE title = ?', [title]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.json(rows[0]);
  } catch (queryErr) {
    console.error('Error executing query:', queryErr);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
