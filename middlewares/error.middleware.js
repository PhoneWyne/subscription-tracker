const errorMiddleware = (err, req, res, next) => {
    try {
        // err is previous step before this middleware came and intercepted
        // this creates a shallow clone with all of err's properties, but error is itself not a Error object
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId error
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            // create a new Error object, with Error's properties
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key, trying to create something with same key
        if (err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error // document fails validators
        if (err.name === 'ValidationError') {
            // previous step with ValidationError, might have MUTLIPLE errors
            // we map over each error, and get the associated message from them
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(','));
            error.statusCode = 400;
        }

        // calling res.status ends request-response cycle, so we don't need to call .next()
        res // response
            .status(error.statusCode || 500) //incase error is not of the 3 types above, it would have undefined statusCode, in that case, assign status of 500 to response
            .json({ success: false, error: error.message || 'Server Error'});
    } catch (error) {
        // simply send the error over to next step
        next(error);
    }
}

export default errorMiddleware;

// example of middleware
// Create a subscription => Middleware (check for renewalDate was entered or not) => Middleware (check for errors) => ONLY when both these Middleware call their next() status, we can navigate to controller => next => controller

