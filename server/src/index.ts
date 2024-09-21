import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import expressWinston from 'express-winston';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';

import logger from './logger/winstonLogger.ts';
import {authenticationGuard} from "./utils/authenticationGuard.ts";
import {ValidationErrorsMiddleware} from "./middlewares/validationErrorsMiddleware.ts";
import {AuthController, PostController, MainController, TagsController} from "./controllers/index.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4444;

// init storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if ( !fs.existsSync('uploads') ) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})
const upload = multer({ storage });

app.use(cors());

//logger request
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    colorize: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', MainController);
app.use('/auth', AuthController);
app.use('/posts', PostController);
app.use('/tags', TagsController);

//get files from uploads folder
app.use('/uploads', express.static('uploads'));

app.post('/upload', authenticationGuard, ValidationErrorsMiddleware, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                result: 'File is required',
                status: 400,
                message: 'File is required',
            });
        }
        res.status(200).json({
            success: true,
            result: {...req.file, url: `${req.protocol}://${req.get('host')}/uploads/${req?.file?.filename}`},
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

// logger error
app.use(expressWinston.errorLogger({
    winstonInstance: logger,
}));

const connectToDB = () => {
    mongoose.connect("mongodb+srv://olehm97:Asdf1234@cluster0.0x22d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: 'mernBlog'})
        .then(() => console.log('MongoDB connected'))
        .catch(e => console.log(e));
};

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    connectToDB();
});

export default app;
