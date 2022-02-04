const express = require("express");
const { createClient, clientSignIn } = require("../controllers/client");
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middleware/validators/user");

const router = express.Router();

//handling signup endpoint
router.post("/clientsignup", validateUserSignUp, userValidation, createClient);
router.post("/clientlogin", validateUserSignIn, userValidation, clientSignIn);
module.exports = router;
