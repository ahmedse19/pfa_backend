const express = require("express");
const {
  LoginAdmin,
  LoginClient,
  SignUpClient,
  createAdmin,
  LogoutClient,
} = require("../controllers/LoginController.js");
const {
  getAdminDetails,
  getClientDetails,
  getMaps,
} = require("../controllers/DetailsController.js");
const { forwardRequest } = require("../controllers/MainController.js");
const { upload } = require("../middleware/middleware.js");

const router = express.Router();
router.route("/loginAdmin").post(LoginAdmin);
router.route("/loginClient").post(LoginClient);
router.route("/signupClient").post(SignUpClient);
router.route("/dev/createAdmin").post(createAdmin);
router.route("/client/userprofile").get(getClientDetails);
router.route("/admin/userprofile").get(getAdminDetails);
router.route("/map").get(getMaps);
router.post("/image", upload.single("image"), forwardRequest);
router.route("/logoutClient").post(LogoutClient);

module.exports = router;
