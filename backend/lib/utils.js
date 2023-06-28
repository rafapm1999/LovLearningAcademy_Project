const jwt = require("jsonwebtoken");

const getRegisterAt = () => {
  return Date.now();
};

module.exports = { getRegisterAt };
