const express = require("express");
const {
  LoginAdmin,
  LoginClient,
  SignUpClient,
  createAdmin,
} = require("../controllers/LoginController.js");
const { forwardRequest } = require("../controllers/MainController.js");
const { upload } = require("../middleware/middleware.js");

const router = express.Router();
router.route("/loginAdmin").post(LoginAdmin);
router.route("/loginClient").post(LoginClient);
router.route("/signupClient").post(SignUpClient);
router.route("/dev/createAdmin").post(createAdmin);
router.post("/image", upload.single("image"), forwardRequest);

module.exports = router;
