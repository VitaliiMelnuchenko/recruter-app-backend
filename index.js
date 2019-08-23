require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const api = require('./api/routes');

const mongoose = require('mongoose');
const dev_db_url = 'mongodb://localhost/test';
const mongoDB = process.env.MONGODB_URL || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', api);

app.listen(3000, () => {
   console.log('server is running');
});