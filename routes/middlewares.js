const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.cookies.user, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        message: "토큰이 만료되었습니다."
      });
    }
    return res.status(401).json({
      message: "유효하지 않은 토큰입니다."
    });
  }
};
