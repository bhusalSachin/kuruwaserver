const Client = require("../models/client");
const jwt = require("jsonwebtoken");

exports.createClient = async (req, res) => {
  const { username, email, phonenumber, password } = req.body;
  if (!email) throw new Error("Enter email");

  try {
    const testEmail = await Client.findOne({ email });
    const testClient = await Client.findOne({ username });
    const testPhone = await Client.findOne({ phonenumber });

    if (testClient) {
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
  const client = await Client({
    username: req.body.username,
    email,
    phonenumber,
    location,
    expoPushToken,
    password,
  });
  await client.save();
  res.json({ success: true, message: client });
};

exports.clientSignIn = async (req, res) => {
  const { email, password } = req.body;

  const client = await Client.findOne({ email });

  if (!client)
    return res.json({
      success: false,
      message: "Client not found for given email",
    });

  const isMatch = await client.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email/Password does not match in the record",
    });

  const token = jwt.sign({ userId: client._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.send({ success: true, client, token });
};
