const express = require("express");
const axios = require("axios");
const prisma = require("./config/prismaClient");
const cors=require("cors");

const { PORT } = require("./config/serverConfig");
const {
  authRoutes,
  invoiceRoutes,
  dashboardRoutes,
} = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, async () => {
  try {
    const admin = await prisma.user.findUnique({
      where: {
        email: "admin@gmail.com",
      },
    });

    if (!admin) {
      await axios.post("http://localhost:3001/auth/signup", {
        email: "admin@gmail.com",
        password: "admin",
      });
    }
    console.log("IMS Backend running on port", PORT);
  } catch (error) {
    console.log(error);
  }
});
