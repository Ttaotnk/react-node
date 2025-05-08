/*import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // แทนที่ด้วย MySQL username ของคุณ
  password: 'root', // แทนที่ด้วย MySQL password ของคุณ
  database: 'login_register' // สร้าง database นี้ใน MySQL ก่อน
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// สร้างตาราง users ถ้ายังไม่มี
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) throw err;
  console.log('Users table ready');
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // ตรวจสอบว่ามี email นี้ในระบบแล้วหรือไม่
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) throw err;
      
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      
      // เข้ารหัส password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // บันทึกผู้ใช้ใหม่
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, results) => {
          if (err) throw err;
          res.json({ success: true, message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // ค้นหาผู้ใช้ด้วย email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) throw err;
      
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      const user = results[0];
      
      // ตรวจสอบ password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      // สร้าง JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'your_jwt_secret', // ควรใช้ secret key ที่ซับซ้อนกว่าใน production
        { expiresIn: '1h' }
      );
      
      res.json({ 
        success: true, 
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});