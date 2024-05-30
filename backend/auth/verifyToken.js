import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async(req, res, next) => {
    const authToken = req.headers.authorization;
    console.log(authToken)

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token is expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export const restrict = roles => async(req, res, next) => {
    const userId = req.userId;

    try {
        // Assuming User model represents both users and doctors
        const user = await Doctor.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: "You are not authorized" });
        }

        next();
    } catch (err) {
        console.error("Error in restrict middleware:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};