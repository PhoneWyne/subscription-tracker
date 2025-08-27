import { Router } from "express";


const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions'}));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription'}));

subscriptionRouter.post('/', (req, res) => res.send({ title: 'POST subscription'}));

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscriptions'}));

export default subscriptionRouter;