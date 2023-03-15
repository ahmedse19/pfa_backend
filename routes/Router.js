const express = require("express");
const {
  LoginAdmin,
  LoginClient,
  SignUpClient,
} = require("../controllers/LoginController.js");
const { saveImage } = require("../middleware/middleware.js");
const saveImageController = require("../controllers/MainController.js");

const router = express.Router();

router.route("/loginAdmin").post(LoginAdmin);
router.route("/loginClient").post(LoginClient);
router.route("/signupClient").post(SignUpClient);
//router.route("/image", saveImage).post(saveImageController);

module.exports = router;
