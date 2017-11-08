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

const client = require('prom-client');
const register = new client.Registry();


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
});


//Metrics route for Prometheus

const h = new client.Histogram({
	name: 'test_histogram',
	help: 'Example of a histogram',
	labelNames: ['code']
});

const c = new client.Counter({
	name: 'test_counter',
	help: 'Example of a counter',
	labelNames: ['code']
});

const g = new client.Gauge({
	name: 'test_gauge',
	help: 'Example of a gauge',
	labelNames: ['method', 'code']
});

setTimeout(() => {
	h.labels('200').observe(Math.random());
	h.labels('300').observe(Math.random());
}, 10);

setInterval(() => {
	c.inc({ code: 200 });
}, 5000);

setInterval(() => {
	c.inc({ code: 400 });
}, 2000);

setInterval(() => {
	c.inc();
}, 2000);

setInterval(() => {
	g.set({ method: 'get', code: 200 }, Math.random());
	g.set(Math.random());
	g.labels('post', '300').inc();
}, 100);

app.get('/metrics', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

app.get('/metrics/counter', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.getSingleMetricAsString('test_counter'));
});

//Enable collection of default metrics
client.collectDefaultMetrics({ register });

module.exports = app;