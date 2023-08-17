require("dotenv").config();
const express = require("express");

require("./config/modelConfig");
const logger = require('./utils/logger')
let commonRouter = require("./routes/mainRouter");

const PORT = process.env.PORT || 5000;
const HOST = "localhost"

const app = express();

app.use(express.json());
app.use("/", commonRouter);

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on PORT : ${process.env.PORT}`),
  logger.info(`server started and running on: http://${HOST}${PORT} `)
});

module.exports = server