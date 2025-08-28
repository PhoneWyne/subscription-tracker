import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
// routes
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';

import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
// this allows app to handle JSON body sent in request
app.use(express.json());
// this allows us to process form data sent via HTML in a simple format
app.use(express.urlencoded({ extended: false}))
// reads incoming cookies from requests
app.use(cookieParser())

// .use(path, Route), prepends path to  Route
app.use('/api/v1/auth', authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/subscriptions`, subscriptionRouter);

// .use() is used with routes, and middlewares
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to subscription tracker API!");
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on port http://localhost:${PORT}`)
    
    await connectToDatabase();
})

export default app;