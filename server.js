const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const index = require('./routes/Index');
const post = require('./routes/Post');
const user = require('./routes/User');
const latest = require('./routes/latest');
const status = require('./routes/status');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', index);
app.use('/status',status);
app.use('/post', post);
app.use('/user', user);
app.use('/latest',latest);

app.listen(3000, function ()
{
    console.log('app listening...on port 3000')
})

module.exports = app;