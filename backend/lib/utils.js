const jwt = require("jsonwebtoken");

const getRegisterAt = () => {
  return  new Date();
};

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {
      expiresIn: "5h",
    });
  } else {
    return jwt.sign(user, process.env.TOKEN, { expiresIn: "5h" });
  }
};

module.exports = { getRegisterAt, generateToken };
