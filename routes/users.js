const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const middlewares = require('./middlewares');

/* GET users listing. */
router.get("/", middlewares.isLoggedIn, controller.index);

router.get("/:id", middlewares.isLoggedIn, controller.show);

router.delete("/:id", middlewares.isLoggedIn, controller.destroy);

router.post("/", middlewares.isLoggedIn, controller.create);
module.exports = router;
