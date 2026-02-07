require("dotenv").config();

module.exports = {
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
};
