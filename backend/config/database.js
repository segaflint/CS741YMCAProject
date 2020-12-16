/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: This code is responsible for the database connection configuration.
*/
module.exports = {
    database: 'mongodb://127.0.0.1:27017/ymca_app',
    mongooseOptions: {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    },
    secret: 'itsasecret'
}