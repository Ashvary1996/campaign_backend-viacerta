const express = require("express");
require("dotenv").config();
const connectToDb = require("./dbConfig");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
//
app.use("/user", require("./routes/userRoute"));

//
app.listen(port, () => {
  console.log("Server is up at port ", port);
});
connectToDb();
