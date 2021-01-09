import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config/index'
import User from '../models/user'

const authenticateMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const dbUser = await User.findById(user._id)
        if (!dbUser) {
            return res.sendStatus(401);
        }
        req.user = dbUser;
        next();
    });
};

export default authenticateMiddleware;