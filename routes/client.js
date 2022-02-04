const express = require("express");
const { createClient, clientSignIn } = require("../controllers/client");
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middleware/validators/user");

const clientrouter = express.Router();

//handling signup endpoint
clientrouter.post(
  "/clientsignup",
  validateUserSignUp,
  userValidation,
  createClient
);
clientrouter.post(
  "/clientlogin",
  validateUserSignIn,
  userValidation,
  clientSignIn
);
module.exports = clientrouter;
