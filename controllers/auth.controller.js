const models = require("../models");
const jwt = require("jsonwebtoken");

exports.signToken = (req, res) => {
  const token = jwt.sign(
    {
      name: req.body.name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m"
    }
  );
  models.user
    .findOne({
      where: {
        name: req.body.name,
        password: req.body.password
      }
    })
    .then(result => {
      res.cookie("user", token);
      res.json({
        token: token
      });
    })
    .catch(error => {
      return res.status(404).json({
        error: "not found"
      });
    });
};
