const mongoose = require("mongoose")

import Counter from '../models/counter'
import User from '../models/user'
import Post from '../models/post'
import { SHOULD_ERASE_BEFORE_RUN, POST_COUNTER_ID, USER_COUNTER_ID } from './index'

const MONGOURI = 'mongodb://blog:9028fnv20b20nv@localhost:27017/'

const initDb = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })

        if (SHOULD_ERASE_BEFORE_RUN) {
            await Promise.all([
                Counter.deleteMany({}),
                User.deleteMany({}),
                Post.deleteMany({}),
            ]);
        }

        await Counter.findById(POST_COUNTER_ID, (err, postCounter) => {
            if (!postCounter) {
                Counter.create({ _id: POST_COUNTER_ID, seq: 1 })
            }
        })
        
        await Counter.findById(USER_COUNTER_ID, (err, userCounter) => {
            if (!userCounter) {
                Counter.create({ _id: USER_COUNTER_ID, seq: 1 })
            }
        })
    } catch (e) {
        throw e
    }
}

export { initDb }