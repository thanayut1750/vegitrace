
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');



const app = express();
app.use(cors())

app.use(express.json());

// Routes
app.use('/api', routes)



app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

