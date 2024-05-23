const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Assuming your connection is exported from connection.js

router.put('/blogUpdate/:title', async (req, res) => {
  const { title } = req.params; // Get the title from request parameters
  const { newTitle, newDescription } = req.body; // Get new title and description from request body

  const query = `
    UPDATE blogsData
    SET title = ?, description = ?
    WHERE title = ?
  `;
  const values = [newTitle, newDescription, title];

  try {
    const [result] = await connection.execute(query, values);
    
    // Check if any rows were affected by the update to check if the blog post was found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error executing update query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
