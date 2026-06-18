const mongoose = require("mongoose")
require("dotenv").config();

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pc_test");
                           
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("error", error)
    console.log(`Error Connecting DB ${error.message}`);
  }
}
module.exports = connectToDB;
