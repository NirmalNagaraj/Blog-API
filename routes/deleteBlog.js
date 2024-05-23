const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.delete('/blogDelete/:title', async (req, res) => {
  const { title } = req.params;

  const query = `
    DELETE FROM blogsData
    WHERE title = ?
  `;
  const values = [title];

  try {
    const [result] = await connection.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog entry not found' });
    }

    res.status(200).json({ message: 'Blog entry deleted successfully' });
  } catch (error) {
    console.error('Error executing delete query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
