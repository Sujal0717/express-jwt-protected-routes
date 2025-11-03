const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT (in production, use environment variable)
const SECRET_KEY = 'your-secret-key-keep-it-safe';

// Hardcoded user credentials for demo purposes
const VALID_USER = {
  username: 'admin',
  password: 'password123'
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

// Public route - Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (username === VALID_USER.username && password === VALID_USER.password) {
    // Generate JWT token
    const token = jwt.sign(
      { username: username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token: token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Protected route - Dashboard
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the protected dashboard!',
    user: req.user
  });
});

// Protected route - Profile
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'This is your protected profile',
    user: req.user
  });
});

// Public route - Home
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to JWT Protected Routes API',
    endpoints: {
      public: ['POST /login', 'GET /'],
      protected: ['GET /dashboard', 'GET /profile']
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
