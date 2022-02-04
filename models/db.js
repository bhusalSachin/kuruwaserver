const mongoose = require("mongoose");

//configuring .env file using dotenv module
const dotenv = require("dotenv");
dotenv.config();

//connecting to mongodb using mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("Connected to the mongodb server successfuly: ");
  })
  .catch((err) => console.log(err));
