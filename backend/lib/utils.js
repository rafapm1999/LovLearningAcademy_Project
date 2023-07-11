const jwt = require("jsonwebtoken");

const getRegisterAt = () => {
  return String(Date.now());
};

module.exports = { getRegisterAt };
