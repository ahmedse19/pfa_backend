module.exports = {
  saveImageController: async (req, res) => {
    const { ImageStatus } = req.body;

    try {
      res.send(ImageStatus);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
