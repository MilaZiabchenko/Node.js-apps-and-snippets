import express from 'express';
import bodyParser from 'body-parser';
import router from './dictionary-routes.js';

const app = express();

app.use(bodyParser.json());
app.use('/dictionary', router);
app.use('/', express.static('./client'));

export default app;
