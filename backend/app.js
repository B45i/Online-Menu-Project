import express from 'express';
import cors from 'cors';
import apiRouter from './routes/routes.js';

// database connection

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(apiRouter);

try {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
    });
} catch (error) {
    console.log(error);
}
