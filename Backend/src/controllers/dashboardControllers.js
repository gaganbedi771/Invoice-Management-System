const DashboardService = require("../services/dashboardService");

exports.get = async (req, res) => {
  try {
    const dashboard = await DashboardService.get();
    res.status(201).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.log("Dashboard Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
