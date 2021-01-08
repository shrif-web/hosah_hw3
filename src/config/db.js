const mongoose = require("mongoose")

const MONGOURI = 'mongodb://blog:9028fnv20b20nv@localhost:27017/'

const connectDb = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        })
        console.log("Connected to DB !!")
    } catch (e) {
        console.log(e)
        throw e
    }
}

export { connectDb }