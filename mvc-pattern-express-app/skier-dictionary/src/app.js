import express from 'express';
import bodyParser from 'body-parser';
import router from './dictionary-routes.js';
import { logger } from './lib.js';

const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use('/dictionary', router);
app.use('/', express.static('./client'));

export default app;
