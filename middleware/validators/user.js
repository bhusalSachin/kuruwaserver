const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is empty")
    .isString()
    .withMessage("Must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be 4 to 20 characters long!"),

  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter the valid email"),
  check("phonenumber")
    .trim()
    .isNumeric()
    .withMessage("Enter valid number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter valid phone Number"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();

  if (!result.length) return next();

  const error = result[0].msg;

  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check("email").normalizeEmail().isEmail().withMessage("Enter valid email"),
  check("password").trim().not().isEmpty().withMessage("Password is required"),
];

exports.validateCallKuruwa = [
  check("username").trim().not().isEmpty().withMessage("username is empty"),
  check("phonenumber")
    .trim()
    .isNumeric()
    .withMessage("Enter valid number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter valid phone Number"),
  check("hospital")
    .trim()
    .not()
    .isEmpty()
    .withMessage("hospital name is empty"),
];
