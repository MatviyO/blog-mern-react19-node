import express, { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



