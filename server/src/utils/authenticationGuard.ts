import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import {JwtPayload} from "../core/types/IJwtPayload.ts";

export const authenticationGuard = async (req: Request, res: Response, next: NextFunction) => {
    console.log("authenticationGuard")
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jsonwebtoken.verify(token, String(process.env.SECRET)) as JwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach the user to the request object
        (req as any).userId = decoded?.id;

        // Pass control to the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};
