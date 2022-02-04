const express = require("express");
const {
  createUser,
  userSignIn,
  getKuruwaLocations,
  getAllPushTokens,
  callKuruwa,
  getAllCallKuruwa,
} = require("../controllers/user");
const { validate } = require("../models/user");
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
  validateCallKuruwa,
} = require("../middleware/validators/user");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

//handling signup endpoint
router.post("/signup", validateUserSignUp, userValidation, createUser);
router.post("/login", validateUserSignIn, userValidation, userSignIn);
router.get("/kuruwalocations", getKuruwaLocations);
router.get("/allpushtokens", getAllPushTokens);
router.post("/callkuruwa", validateCallKuruwa, userValidation, callKuruwa);
router.get("/getcallkuruwa", getAllCallKuruwa);
module.exports = router;
