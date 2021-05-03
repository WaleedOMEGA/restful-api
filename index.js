/*
* primary file of the server
*
*/

// Dependencies
var server=require('./lib/server');
var workers=require('./lib/workers');
var cli = require('./lib/cli');

// Declare the app
var app={};

// init function
app.init=function(){

    // start the server
    server.init();

    // start the workers
    workers.init();

    // start the cli , but make sure it starts last
    setTimeout(function(){
        cli.init();
    },50);

};

// execute
app.init();

// export the app
module.exports=app;