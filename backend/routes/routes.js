
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../db/models/User'); // Import your User model

require('dotenv').config();

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/vegetable-traceability';
const database = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


// Check connection
database.then((db) => {
    console.log('Connected to MongoDB');
  }, (err) => {
    console.log(err);
  });

const router = express.Router()

// Use body-parser middleware to parse JSON data
router.use(bodyParser.json());

router.get('/test', (req, res) => {
    res.send('API 1234')
})



//Post Method
router.post('/', (req, res) => {
    res.send('POST request to homepage')
  })
router.post('/register', async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({userEmail: newUser.email, userRole: newUser.stakeholder });
      } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Error during registration' });
      }
}
)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the passwords
    if (user.password !== password) {
      // Passwords don't match
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', userRole: user.stakeholder });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error', error });
  }
});


//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;