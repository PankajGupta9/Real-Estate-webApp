import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req,res, next) => {

    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.access_token;

    console.log('Token received:', token); // Log the token for debugging
    console.log('Cookies received in request:', req.cookies);


    if(!token) return next(errorHandler(401, 'Unautherized: no token provided'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'invalid token'));

        req.user = user;
        next();
    })
}




