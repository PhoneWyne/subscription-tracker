import { config } from "dotenv";

// filename for env. in our project follow a structure
// .env.<%testing_ground%>.local
// for example, for production, .env file is called `.env.production.local`
// dynamically providing filepath to different .env file, instead of overwriting the same .env for each different environment, just create different .env and dynamically pass it to config
config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`,
    debug: 'true',
});


export const { PORT, NODE_ENV } = process.env;
