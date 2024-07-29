const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

router.get('/userdata', (req, res) => {
    console.log(req.query)
    const { username } = req.query;
    console.log("user.js")
    db.query('SELECT id, username, email, firstname, lastname, gender, token FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            const userData = results[0]; 
            return res.json({ success: true, userData });
        } else {
            return res.json({ success: false });
        }
    });
});

module.exports = router;
