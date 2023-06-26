const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/review_rating' , {useNewUrlParser : "true"});
mongoose.connection.on('error' , (err) => console.log('error' , err));
mongoose.connection.on('connected' , (err , res) => console.log('MongoDB is Connected'));