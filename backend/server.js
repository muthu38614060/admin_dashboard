const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());  
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  
  });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body);

  const { email, password, role } = req.body;


  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
 const{role}=user
 console.log('====================================');
 console.log(role);
 console.log('====================================');

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Login successful',role, token });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
