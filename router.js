const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h2>Trodden Chat Service</h2><p>Status: Ok</p>");
});

module.exports = router;
