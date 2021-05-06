const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Ok");
});

module.exports = router;
