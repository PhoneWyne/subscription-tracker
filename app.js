import express from 'express';

import { PORT } from './config/env.js';
// routes
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';

import connectToDatabase from './database/mongodb.js';

const app = express();

// .use(path, Route), prepends path to  Route
app.use('/api/v1/auth', authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/subscriptions`, subscriptionRouter);

app.get('/', (req, res) => {
    res.send("Welcome to subscription tracker API!");
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on port http://localhost:${PORT}`)
    
    await connectToDatabase();
})

export default app;