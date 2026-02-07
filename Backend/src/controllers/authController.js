const AuthService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.signup(email, password);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Auth Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.signin(email, password);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Auth Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
