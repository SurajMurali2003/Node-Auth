const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB() {
  try {
    await mongoose.connect("mongodb+srv://surajmuralisri:surajmuralisri2003@cluster0.tnjerrq.mongodb.net/");
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`Error Connecting DB ${error.message}`);
  }
}
module.exports = connectToDB;
