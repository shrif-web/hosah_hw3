const express = require('express')
const bodyParser = require('body-parser')
const app = express()
import routes from './routes';
import { initDb } from './config'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/post/crud', routes.post);
app.use('/api/admin/user/crud', routes.user);
app.use('/api', routes.auth);
app.use('/api/posts', routes.postsIndex);

initDb().then(async() => {
    app.listen(3000, () => {});
});