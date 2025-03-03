const express = require("express");
const { newUser, getAllUsers, exportToExcel } = require("../controller/userController");

const route = express.Router();

route.post("/new_user", newUser);
route.get("/all_user", getAllUsers);
route.get("/export_excel", exportToExcel);

module.exports = route;
