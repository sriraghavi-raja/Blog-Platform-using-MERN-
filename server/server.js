const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://172.21.32.1:3000'], // Allow specific origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog-mern';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRoutes);

// Example route
app.get('/', (req, res) => {
    res.send('MERN Blog Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});