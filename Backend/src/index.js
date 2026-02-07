const express = require("express");

const { PORT } = require("./config/serverConfig");
const { authRoutes, invoiceRoutes,dashboardRoutes } = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log("IMS Backend running on port", PORT);
});
