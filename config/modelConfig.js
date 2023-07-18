const mongoose = require('mongoose');

const logger = require('../utils/logger')

mongoose.connect(process.env.URL , {useNewUrlParser : "true"});
mongoose.connection.on('error' , (err) => {
  console.log('error' , err),
  logger.log('error', "mongoose connection error")
});
mongoose.connection.on('connected' , (err , res) => {
  console.log('MongoDB is Connected'),
  logger.log('info', "MongoDB is connected")
});