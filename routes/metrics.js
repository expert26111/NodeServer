const client = require('prom-client');
const register = new client.Registry();
const express = require('express');

const app = express();
var router = express.Router();

client.collectDefaultMetrics({ register });


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



router.get('/', function (req, res) {
    
        res.set('Content-Type', register.contentType);
        res.end(register.metrics());
    });

    module.exports = router;
//Metrics route for Prometheus


// app.get('/metrics', (req, res) => {
// 	res.set('Content-Type', register.contentType);
// 	res.end(register.metrics());
// });

// app.get('/metrics/counter', (req, res) => {
// 	res.set('Content-Type', register.contentType);
// 	res.end(register.getSingleMetricAsString('test_counter'));
// });

//Enable collection of default metrics
