/**
 *  Main file, setup the app server
 *  Entry point of the Weather app
 */
 
 const express = require('express'),
 bodyParser = require('body-parser'),
 Logger = require('./modules/logger'),
 path = require('path'),
 router = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define public assets folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 Logger.info('[server] server started');
 Logger.info('[server] visit http://localhost:' + PORT);
});

// Init routes module
router.init(app);