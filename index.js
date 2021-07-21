const config = require('./config.json');
const db = require('./database/db');

const express = require('express');
const cors = require('cors');

const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// get routes
const loginRoute = require('./routes/login');
const addRoute = require('./routes/add');
const redirectRoute = require('./routes/redirect');

// add routes
app.use('/login', loginRoute);
app.use('/add', addRoute);
app.use('/', redirectRoute);


// app.use('/', (req, res) => {
//     res.send('Welcome to short url server 0.1');
// });




db.initDb().then(() => {
	app.listen(config.server.port, () => {
		console.log('Listening on port ' + config.server.port + '...');
	});

}, () => { console.error('failed to connect to db'); });

