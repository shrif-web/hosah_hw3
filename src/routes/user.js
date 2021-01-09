import { Router } from 'express';

import User from '../models/user'
import authenticateMiddleware from '../middleware/jwt_authenticate'

const router = Router();

router.use(authenticateMiddleware)

router.get('/:id', async(req, res) => {
    const users = await User.find()
    const user = await User.findOne({ id: req.params.id })
    if (!user) {
        return res.status(400).send({
            message: 'url id is not valid'
        })
    }
    if (user._id.toString() !== req.user._id.toString()) {
        return res.status(401).send({
            message: 'permission denied'
        })
    }
    return res.status(200).send({
        user: {
            id: user.id,
            email: user.email,
            created_at: `${user.created_at.getFullYear()}/${user.created_at.getMonth() + 1}/${user.created_at.getDate()}`
        }
    })
})

export default router;