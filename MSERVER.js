import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000; // ใช้ PORT จาก Environment หรือ 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoUrl = process.env.MONGODB_URI; // ใช้ค่าจาก Environment
const dbName = 'test-mongo-login';
let db;
let client;

async function connectToDatabase() {
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB database.');
    db = client.db(dbName);

    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Users collection ready with unique email index');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

connectToDatabase()
  .then(() => console.log('Database connection established'))
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!db) return res.status(500).json({ success: false, message: 'Database not connected' });

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      created_at: new Date()
    });

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!db) return res.status(500).json({ success: false, message: 'Database not connected' });

    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your_jwt_secret', // เปลี่ยน secret จริงใน Production!
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});