const jwt = require("jsonwebtoken");

const getRegisterAt = () => {
  return Date.now().toString();
};

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {
      expiresIn: "20m",
    });
  } else {
    return jwt.sign(user, process.env.TOKEN, { expiresIn: "10m" });
  }
};

module.exports = { getRegisterAt, generateToken };
