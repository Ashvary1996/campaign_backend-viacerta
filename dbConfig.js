const mongoose = require("mongoose");
const {
  generateExcelFile,
} = require("./controller/userController");
const mongo_URI = process.env.MONGO_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(mongo_URI);
    console.log("Connected To database successfully");
    
    const User = require("./models/User");

    const changeStream = User.watch();

    changeStream.on("change", async (change) => {
      console.log(
        "Database Change Detected:"
        //  change,
      );

      await generateExcelFile();
    });
  } catch (error) {
    console.log("Error in connecting to database");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDb;
