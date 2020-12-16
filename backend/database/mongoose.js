/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: This code is responsible for defining mongoose database connection
*/
const mongoose = require('mongoose');
const config = require('../config/database');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, config.mongooseOptions)
mongoose.connection.on('connected', () => console.log('Database Connected: ' + config.database));
mongoose.connection.on('error', (error) => console.log(error));

module.exports = mongoose;