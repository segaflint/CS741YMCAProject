const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('./database/mongoose');

const app = express();

const users = require('./routes/users');
const programs = require('./routes/programs');


const port = 3000;

app.listen(port, () => console.log("Server connected on port " + port));;

// app.get('/', (req, res) => {
//     res.send('Invalid Endpoint');
// });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users/', users);
app.use('/programs/', programs);
