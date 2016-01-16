var chalk = require('chalk');
var express = require('express');
var app = express();
var router = require('./router');

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

app.listen(process.env.PORT, function() {
	console.log(chalk.magenta('El equipo servidor esta oyendo en el puerto tres mil y uno'));
})

app.use('/', router);

app.use('/', express.static('./client'));
app.use('/', express.static('./node_modules'));
app.use('/', express.static('./bower_components'));
