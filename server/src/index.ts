import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import expressWinston from 'express-winston';

import authRoutes from './conrollers/AuthController.ts';
import mainRoutes from './conrollers/MainController.ts';
import postRoutes from './conrollers/PostController.ts';
import logger from './logger/winstonLogger.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4444;

//logger request
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    colorize: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

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
