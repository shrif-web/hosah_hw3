import { Router } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import { SECRET_KEY } from '../config/index'

const router = Router();

const isEmailValid = (email) => {
    return /^\S+@\S+$/.test(email)
}

router.post('/signup', async(req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    if (!email || !password) {
        return res.status(400).send({
            message: 'Request Length should be 2'
        })
    }
    const user = await User.findOne({
        email: email
    })
    if (user) {
        return res.status(409).send({
            message: 'email already exists'
        })
    }
    if (!isEmailValid(email)) {
        return res.status(400).send({
            message: 'field `email` is not valid'
        })
    }
    if (password.length < 5) {
        return res.status(409).send({
            message: 'field `password`.length should be gt 5'
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    await User.create({ email: email, password: hashedPassword })
    return res.status(201).send({
        message: 'user has been created.'
    })
})

router.post('/signin', async (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    const user = await User.findOne({ email: email })
    if (!email || !password) {
        return res.status(400).send({ message: 'Request length should be 2' })
    }
    if (!isEmailValid(email)) {
        return res.status(400).send({ message: 'field `email` is not valid' })
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ message: 'wrong email or password' })
    }

    const token = await jwt.sign({ _id: user._id }, SECRET_KEY)
    return res.send({ 'token': `Bearer ${token}` });
});

export default router;