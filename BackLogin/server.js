const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const userRoutes = require('./user'); 

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'login'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.use('/', userRoutes);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('Select * from users where username = ? and password = ? ', [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length > 0) {
          return res.json({success: true,  });
      } else {
          return res.json({success: false });
      }
    });
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
