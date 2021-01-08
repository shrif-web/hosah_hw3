const express = require('express')
const bodyParser = require('body-parser')
const app = express()
import routes from './routes';
import { connectDb } from './config/db'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes.auth);

connectDb().then(async() => {
    app.listen(3000, () =>
        console.log('Example app listening on port 3000'),
    );
});