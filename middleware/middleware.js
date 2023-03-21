const { jwt } = require("jsonwebtoken");
const multer = require("multer");
const uuid = require("uuid");
////////////// multer config /////////////
const storage = multer.diskStorage({
  destination: "license_plates_Data/",
  filename: function (req, file, cb) {
    cb(null, uuid.v1() + "-" + file.originalname);
  },
});

upload = multer({ storage: storage });
module.exports = { upload };

//////////////jwt authetification///////////////

// export function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
//////////////multer middleware///////////////
// export function saveImage(req, res, next) {
//   upload.single("image"), (req, res) => {};
//   req.ImageStatus = "Image saved";
//   next();
// }
