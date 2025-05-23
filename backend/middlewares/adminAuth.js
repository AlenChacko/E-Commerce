import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized! Login again.",
      });
    }

    const token = authHeader.split(" ")[1];

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Not authorized!",
      });
    }

    next();
  } catch (error) {
    console.log("Admin auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export default adminAuth;
