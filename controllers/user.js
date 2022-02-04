const User = require("../models/user");
const Call = require("../models/call");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, phonenumber, location, expoPushToken, password } =
    req.body;
  if (!email) throw new Error("Enter email");

  try {
    const testEmail = await User.findOne({ email });
    const testUser = await User.findOne({ username });
    const testPhone = await User.findOne({ phonenumber });

    if (testUser) {
      res.json({
        status: "Failed",
        message: "username already in use",
      });
      return;
    }
    if (testEmail) {
      res.json({
        status: "Failed",
        message: "Email already in use",
      });
      return;
    }
    if (testPhone) {
      res.json({
        status: "Failed",
        message: "Phone Number is already in use",
      });
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
  const user = await User({
    username: req.body.username,
    email,
    phonenumber,
    location,
    expoPushToken,
    password,
  });
  await user.save();
  res.json({ success: true, message: user });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "User not found for given email",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email/Password does not match in the record",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.send({ success: true, user, token });
};

exports.getKuruwaLocations = async (req, res) => {
  console.log("Got location request....");
  const allKuruwas = await User.find({});

  if (allKuruwas.length === 0) {
    return res.json({
      success: false,
      message: "No kuruwas found in the record",
    });
  }

  return res.json({
    success: true,
    message: allKuruwas.map((kuruwa) => {
      return { name: kuruwa.username, ...kuruwa.location };
    }),
  });
};

exports.getAllPushTokens = async (req, res) => {
  console.log("got push token request....");
  const allKuruwas = await User.find({});

  if (allKuruwas.length === 0)
    return res.json({
      success: false,
      message: "No kuruwas found in the record.",
    });

  return res.json({
    success: true,
    message: allKuruwas.map((kuruwa) => kuruwa.expoPushToken),
  });
};

exports.callKuruwa = async (req, res) => {
  const { username, phonenumber, hospital } = req.body;
  const checkCall = await Call.findOne({ username, phonenumber, hospital });

  if (checkCall)
    return res.json({ success: false, message: "Call already exists" });
  const call = await Call({ username, phonenumber, hospital });

  await call.save();

  return res.json({
    success: true,
    message: "Kuruwa call is saved successfully!",
  });
};

exports.getAllCallKuruwa = async (req, res) => {
  const call = await Call.find({});

  return res.json({
    success: true,
    message: call,
  });
};
