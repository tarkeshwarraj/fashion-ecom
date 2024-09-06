import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode token to get userId
        req.body.userId = decodedToken.id;  // Set userId to req.body.userId
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
