const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Call = new Schema(
  {
    username: String,
    phonenumber: String,
    hospital: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 1200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Call", Call);
