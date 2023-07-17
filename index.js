require("dotenv").config();
const express = require("express");
require("./config/modelConfig");
let commonRouter = require("./routes/mainRouter");
//const {transporter , mailOptions} = require('./service/emailService');
//const cron = require('node-cron')

const app = express();

app.use(express.json());
app.use("/", commonRouter);

// app.get('/send' , async (req , res) => {
//   transporter.sendMail(mailOptions ,  (error , info) => {
//     if(error) {
//       console.log(error)
//     } else {
//       console.log(`Email sent Successfully ${info.response}`);
//     }
//   })
// })

// cron.schedule(" */15 * * * * * " , () => {
//   console.log('Running a Task in every 10 sec');
//   transporter.sendMail(mailOptions ,  (error , info) => {
//     if(error) {
//       console.log(error)
//     } else {
//       console.log(`Email sent Successfully ${info.response}`);
//     }
//   })
// })

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on PORT : ${process.env.PORT}`);
});
