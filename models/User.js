const mongoose = require("mongoose");

const validator = require("validator");

const countryCodeMap = {
  UK: "+44",
  USA: "+1",
  Spain: "+34",
  France: "+33",
  Germany: "+49",
  Poland: "+48",
  Hungary: "+36",
  Netherlands: "+31",
  Belgium: "+32",
  Ireland: "+353",
  Australia: "+61",
  New_Zealand: "+64",
  Finland: "+358",
  Sweden: "+46",
  Denmark: "+45",
  Singapore: "+65",
  Dubai: "+971",
  Greece: "+30",
  CzechRepublic: "+420",
  Canada: "+1",
  Russia: "+7",
  Bulgaria: "+359",
  Switzerland: "+41",
};

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      // validate: {
      //   validator: validator.isEmail,
      //   message: "Not a valid email address",
      // },
    },
    year: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    contactNo: {
      type: String,
      required: [true, "Please Enter Your Phone Number"],
      // validate: {
      //   validator: function (v) {
      //     return /^[6-9]\d{9}$/.test(v);
      //   },
      //   message: "Enter a valid phone number (10 digits, starting with 6-9).",
      // },
    },
    countryCode: { type: String },
    countryPreference: {
      type: String,
      required: true,
      // enum: Object.keys(countryCodeMap),
    },
    degree: {
      type: String,
      // enum: ["Bachelor", "Master", "Ph.D"],
      required: true,
    },
  },
  { timestamps: true }
);

// UserSchema.pre("save", function (next) {
//   if (this.countryPreference && countryCodeMap[this.countryPreference]) {
//     this.countryCode = countryCodeMap[this.countryPreference];
//   } else {
//     return next(new Error("Invalid country preference"));
//   }
//   next();
// });
const User = mongoose.model("Users", UserSchema);
module.exports = User;
