const express = require("express");
const fs = require("fs");
const cors = require("cors");
const router = require("./routes/Router.js");
const bodyparser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyparser.json());
app.use(express.json());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
