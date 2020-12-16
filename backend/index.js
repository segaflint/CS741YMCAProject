/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Init file for the backend. Defines "imports" and routes.
*/
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('./database/mongoose');

const app = express();

const users = require('./routes/users');
const programs = require('./routes/programs');
const registrations = require('./routes/registrations');


const port = 3000;

app.listen(port, () => console.log("Server connected on port " + port));;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users/', users);
app.use('/programs/', programs);
app.use('/registrations/', registrations);
