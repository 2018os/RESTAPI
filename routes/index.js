const express = require("express");
const router = express.Router();

const users = [
  {
    id: 0,
    name: "KIM"
  },
  {
    id: 1,
    name: "LEE"
  }
];
/* GET home page. */
router.get("/", (req, res, next) => {
  return res.json(users);
});

module.exports = router;
