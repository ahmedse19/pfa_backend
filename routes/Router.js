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
const {
  ResendEmail,
  verifyEmail,
} = require("../controllers/EmailController.js");
const {
  forwardRequest,
  getParkings,
  getReservations,
} = require("../controllers/MainController.js");
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
router.route("/resendEmail").post(ResendEmail);
router.route("/verifycode").post(verifyEmail);
router.route("/getParkings").get(getParkings);
router.route("/getReservations").get(getReservations);

module.exports = router;
