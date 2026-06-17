import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        const token =
            req.headers.authorization?.split(
                " "
            )[1];

        if (!token) {
            return res.status(401).json({
                message: "No token provided,please log in",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.userId
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};

export default protect;