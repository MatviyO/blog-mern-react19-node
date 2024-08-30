import express, { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {validationResult} from "express-validator";
import { registerValidation } from './validators/AuthValidation.ts';
import UserModel from "./models/User.ts";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/auth/login', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                result: 'Wrong email or password',
                status: 400,
                message: 'Wrong email or password',
            })
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                result: 'Wrong email or password',
                status: 400,
                message: 'Wrong email or password',
            })
        }
        const token = jsonwebtoken.sign({ email: user.email, id: user._id }, String(process.env.SECRET), { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            result: {...user, token},
            status: 200,
            message: 'Login successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        })
    }

})

app.post('/auth/register', registerValidation, async (req: Request, res: Response) => {
    try {
        // first validate registerValidation
        // make sure that what came to the server actually matches the validationResult
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
            avatarUrl: req.body.avatarUrl || ""
        });

        const user = await doc.save();
        const token = jsonwebtoken.sign({ email: user.email, id: user._id }, String(process.env.SECRET), { expiresIn: '1h' });

        res.status(201).json({
            success: true,
            result: {...user, token},
            status: 201,
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error,
            status: 500,
            message: 'Something went wrong',
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    mongoose.connect("mongodb+srv://olehm97:Asdf1234@cluster0.0x22d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: 'mernBlog'})
        .then(r => console.log('MongoDB connected'))
        .catch(e => console.log(e));
});



