const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.user;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    return next();
  } else {
    return res.status(401).json({
      message: "유효하지 않은 토큰입니다."
    });
  }
};
