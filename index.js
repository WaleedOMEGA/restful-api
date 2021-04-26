/*
* primary file of the server
*
*/

// Dependencies
var server=require('./lib/server');
var workers=require('./lib/workers');

// Declare the app
var app={};

// init function
app.init=function(){

    // start the server
    server.init();

    // start the workers
    workers.init();

};

// execute
app.init();

// export the app
module.exports=app;