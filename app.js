var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');

var app = express();

app.get('/', function(request, response){
    response.send('Hello from my library app');
});

app.listen(3000, function(){
    debug(`listening on port ${chalk.green('3000')}`);
});