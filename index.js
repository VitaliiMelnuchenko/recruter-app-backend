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

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
   next();
});

app.use('/', api);

app.listen(process.env.PORT, process.env.ID, () => {
   console.log('server is running');
});