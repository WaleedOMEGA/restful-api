/*
*
* server-related tasks
*
*/
// Dependences
var http = require('http');
var https = require('https');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs=require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path=require('path');

// instantiate the server module object
var server={};

// Instantiate the HTTP Server
server.httpServer = http.createServer(function(req,res){
    unifiedServer(req, res);
});

// Instantiate the HTTPS Server
server.httpsServerOptions = {
    'key':fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
    'cert':fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};

server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
    server.unifiedServer(req, res);
});

// all the server logic for both the http and https server
server.unifiedServer = function (req, res) {
      // get the url and parse it
    var parsedUrl=url.parse(req.url,true);
    // get the path
    var path=parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // get the query string as an object
    var queryStringObject=parsedUrl.query;
    // get the http method
    var method=req.method.toLowerCase();
    // get the headers as an object
    var headers = req.headers;
    // get the payload if any
    var decoder = new stringDecoder('utf-8');
    var buffer ='';
    req.on('data',function(data){
        buffer +=decoder.write(data);
    });
    req.on('end',function(){
        buffer+=decoder.end();
        // choose the handler this request should go to. if one is not found,use the notfound handler
        var chosenHandler=typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
        // construct the data object to send to the handler
        var data={
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':helpers.parseJsonToObject(buffer)
        };
        // route the request to the handler specified in the router
        chosenHandler(data,function(statusCode,payload){
            // use the status code called back by the handler,or default to 200
            statusCode=typeof(statusCode) == 'number' ? statusCode : 200;
            // use the payload called back by the handler,or default to empty object
            payload=typeof(payload)=='object'?payload:{};
            // convert the payload to a string
            var payloadString=JSON.stringify(payload);
            // return the response
            res.setHeader('Content-Type','applicaton/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            // log the request path
            console.log('returning this response :',statusCode,payloadString);
        });
    });
};



// define request router
server.router = {
    'ping': handlers.ping,
    'users':handlers.users,
    'tokens':handlers.tokens,
    'checks':handlers.checks
};

// init script
server.init=function(){

// start the http server 
server.httpServer.listen(config.httpPort,function(){
    console.log(`this server is listening on port ${config.httpPort}`);
});

// start the https server 
server.httpsServer.listen(config.httpsPort,function(){
    console.log(`this server is listening on port ${config.httpsPort}`);
});

};

// export the module
module.exports=server;