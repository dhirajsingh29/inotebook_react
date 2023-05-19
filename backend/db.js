const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(
        () => {console.log('Connected to Mongo successfully');},
        err => { console.error(err);}
    );
}

module.exports = connectToMongo;