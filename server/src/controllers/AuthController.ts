import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import UserModel from '../models/User.ts';
import {loginValidation, registerValidation} from '../validators/AuthValidation.ts';
import { authenticationGuard } from '../utils/authenticationGuard.ts';
import { handleUserNotFound } from '../utils/responseHelpers.ts';
import {ValidationErrorsMiddleware} from "../middlewares/validationErrorsMiddleware.ts";

const AuthController = express.Router();

// explanation: first we check validation with express-validator and after parse errors by ValidationErrorsMiddleware
AuthController.post('/login', loginValidation, ValidationErrorsMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return handleUserNotFound(res, "Wrong email or password", 400);
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                result: 'Wrong email or password',
                status: 400,
                message: 'Wrong email or password',
            });
        }

        const token = jsonwebtoken.sign({ email: user.email, id: user._id }, String(process.env.SECRET), { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            result: { ...user.toObject(), token },
            status: 200,
            message: 'Login successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
});

AuthController.post('/register', registerValidation, ValidationErrorsMiddleware, async (req: Request, res: Response) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
            imageUrl: req.body.imageUrl || ""
        });

        const user = await doc.save();
        const token = jsonwebtoken.sign({ email: user.email, id: user._id }, String(process.env.SECRET), { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            result: { ...user.toObject(), token },
            status: 201,
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
});

AuthController.get('/getUser', authenticationGuard, async (req: Request, res: Response) => {
    console.log("call")
    try {
        const user = await UserModel.findById((req as any)?.userId);
        if (!user) {
            return handleUserNotFound(res, "Wrong email or password", 400);
        }

        res.status(200).json({
            success: true,
            result: user,
            status: 200,
            message: 'Successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        });
    }
});

export default AuthController;
