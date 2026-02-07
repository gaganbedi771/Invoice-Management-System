exports.validateAuthInput  = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    next();
  } catch (error) {
    console.log("Validation error", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
