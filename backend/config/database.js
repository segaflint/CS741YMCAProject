module.exports = {
    database: 'mongodb://127.0.0.1:27017/ymca_app',
    mongooseOptions: {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    },
    secret: 'itsasecret'
}