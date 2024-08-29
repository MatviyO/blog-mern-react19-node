import express, { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation } from './validators/AuthValidation';
import {validationResult} from "express-validator";
import UserModel from "./models/User";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.post('/auth/login', (req: Request, res: Response) => {
    const token = jsonwebtoken.sign({ username: 'admin' }, String(process.env.SECRET), { expiresIn: '1h' });
    res.send('Login successful');
})

app.post('/auth/register', registerValidation, async (req: Request, res: Response) => {
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
    res.json({
        success: true,
        result: user,
        status: 201,
        message: 'User created successfully',
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    mongoose.connect("mongodb+srv://olehm97:Asdf1234@cluster0.0x22d.mongodb.net/mernBlog?retryWrites=true&w=majority&appName=Cluster0", {dbName: 'auth'})
        .then(r => console.log('MongoDB connected'))
        .catch(e => console.log(e));
});



