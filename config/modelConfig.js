const mongoose = require('mongoose');

mongoose.connect(process.env.URL , {useNewUrlParser : "true"});
mongoose.connection.on('error' , (err) => console.log('error' , err));
mongoose.connection.on('connected' , (err , res) => console.log('MongoDB is Connected'));