const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: String,
    email: String,
    phonenumber: String,
    location: Object,
    expoPushToken: String,
    password: String,
  },
  { timestamps: true }
);

User.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      next();
    });
  }
});

User.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing. ");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password ", error.message);
  }
};

module.exports = mongoose.model("User", User);
