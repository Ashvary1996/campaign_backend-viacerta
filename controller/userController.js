const User = require("../models/User");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const newUser = async (req, res) => {
  try {
    const { name, email, subject, contactNo, countryPreference, degree } =
      req.body;

    if (!name || !email || !contactNo || !countryPreference || !degree) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required !",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
      subject,
      contactNo,
      countryPreference,
      degree,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ total_Users: user.length, allUsers: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const exportToExcel = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../exports", "UsersData.xlsx");
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    res.download(filePath, "UsersData.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const generateExcelFile = async () => {
  try {
    const users = await User.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users Data");

    worksheet.columns = [
      { header: "ID", key: "_id", width: 25 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Contact No", key: "contactNo", width: 15 },
      { header: "Subject", key: "subject", width: 50 },
      { header: "Country", key: "countryPreference", width: 15 },
      { header: "Country_Code", key: "countryCode", width: 5 },
      { header: "Degree", key: "degree", width: 15 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    users.forEach((user) => {
      worksheet.addRow(user);
    });

    const filePath = path.join(__dirname, "../exports", "UsersData.xlsx");

    if (!fs.existsSync(path.join(__dirname, "../exports"))) {
      fs.mkdirSync(path.join(__dirname, "../exports"));
    }

    await workbook.xlsx.writeFile(filePath);
    console.log("Excel file updated successfully");
  } catch (error) {
    console.error("Error generating Excel file:", error.message);
  }
};
module.exports = { newUser, getAllUsers, exportToExcel, generateExcelFile };
