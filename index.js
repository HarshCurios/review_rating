require('dotenv').config();
const express = require('express');
require('./config/modelConfig');
const app = express();

let userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use('/' , userRouter)

app.listen(process.env.PORT , (req , res) => {
  console.log(`Server is running on PORT : ${process.env.PORT}`);
})