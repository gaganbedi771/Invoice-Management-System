const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/serverConfig");

exports.signup = async (email, password) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return { id: user.id, email: user.email };
  } catch (error) {
    console.log("Error in Auth service", error);
    throw error;
  }
};

exports.signin = async (email, password) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      throw new Error("User does not exists");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid incorrect");
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    const resultObj = {
      user: { id: existingUser.id, email: existingUser.email },
      token,
    };

    return resultObj;
  } catch (error) {
    console.log("Error in Auth service", error);
    throw error;
  }
};
