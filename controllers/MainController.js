const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

module.exports = {
  forwardRequest: async (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "no image found" });
    } else {
      console.log(req.file);
      const id = req.file.filename;
      console.log(req.file.buffer);
      const { path, mimetype, filename } = req.file;

      const formData = new FormData();
      formData.append("image", fs.createReadStream(path), {
        filename,
        contentType: mimetype,
        knownLength: req.file.size,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:4000/detectlicenseplate",
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data.response);
          res.json(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.send("error");
        });
    }
  },
};
