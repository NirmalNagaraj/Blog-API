const express = require('express');
const router = express.Router();
const connection = require('../connection'); 

router.post('/blogs', async (req, res) => {
  const { title, description, link } = req.body;
  
  const query = 'INSERT INTO blogsData (title, description, thumbnail) VALUES (?, ?, ?)';
  try {
    const [results] = await connection.query(query, [title, description, link]);
    res.status(201).json({ message: 'Blog created successfully', blogId: results.insertId });
  } catch (error) {
    console.error('Error inserting blog data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
