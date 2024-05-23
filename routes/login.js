const express = require('express');
const connection = require('../connection');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user: results[0] });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
