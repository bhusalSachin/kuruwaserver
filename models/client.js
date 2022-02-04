const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const Client = new Schema(
  {
    username: String,
    email: String,
    phonenumber: String,
    password: String,
  },
  { timestamps: true }
);

Client.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      next();
    });
  }
});

Client.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing. ");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password ", error.message);
  }
};

module.exports = mongoose.model("Client", Client);
