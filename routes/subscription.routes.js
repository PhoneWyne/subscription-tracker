import { Router } from "express";


const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions'}));

// get particular subscription, without caring to which user it's tied to // id of subscription is passed here
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription'}));

subscriptionRouter.post('/', (req, res) => res.send({ title: 'POST subscription'}));

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscriptions'}));

// get a specific subscription, tied to a specific user, identified by its id // id of user is passed here
subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: 'GET all subscription belonging to a user'}));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals'}));



export default subscriptionRouter;