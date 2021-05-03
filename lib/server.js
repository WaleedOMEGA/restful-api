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
    server.unifiedServer(req, res);
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
        
          // if the request is within the public directory , use the public handler instead
          chosenHandler=trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler; 

        // construct the data object to send to the handler
        var data={
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':helpers.parseJsonToObject(buffer)
        };
        // route the request to the handler specified in the router
        chosenHandler(data,function(statusCode,payload,contentType){

            // determine the content type of response (fallback to json)
            contentType=typeof(contentType)=='string' ? contentType:'json';

            // use the status code called back by the handler,or default to 200
            statusCode=typeof(statusCode) == 'number' ? statusCode : 200;

            // return the response-parts that are content-specific
            var payloadString='';
            if(contentType=='json'){
                res.setHeader('Content-Type','applicaton/json');
                payload=typeof(payload)=='object'?payload:{};
                payloadString=JSON.stringify(payload);
            }
            if(contentType=='html'){
                res.setHeader('Content-Type','text/html');
                payloadString=typeof(payload)=='string'?payload:'';
            }
            if(contentType=='favicon'){
                res.setHeader('Content-Type','image/x-icon');
                payloadString=typeof(payload)!=='undefined'?payload:'';
            }
            if(contentType=='css'){
                res.setHeader('Content-Type','text/css');
                payloadString=typeof(payload)!=='undefined'?payload:'';
            }
            if(contentType=='png'){
                res.setHeader('Content-Type','image/png');
                payloadString=typeof(payload)!=='undefined'?payload:'';
            }
            if(contentType=='jpg'){
                res.setHeader('Content-Type','image/jpeg');
                payloadString=typeof(payload)!=='undefined'?payload:'';
            }
            if(contentType=='plain'){
                res.setHeader('Content-Type','text/plain');
                payloadString=typeof(payload)!=='undefined'?payload:'';
            }
            // return the response-parts that are common to all content-types
            res.writeHead(statusCode);
            res.end(payloadString);

            // log the request path
            console.log('returning this response :',statusCode,payloadString);
        });
    });
};



// define request router
server.router = {
    '':handlers.index,
    'account/create':handlers.accountCreate,
    'account/edit':handlers.accountEdit,
    'account/deleted':handlers.accountDeleted,
    'session/create':handlers.sessionCreate,
    'session/deleted':handlers.sessionDeleted,
    'checks/all':handlers.checksList,
    'checks/create':handlers.checksCreate,
    'checks/edit':handlers.checksEdit,
    'ping': handlers.ping,
    'api/users':handlers.users,
    'api/tokens':handlers.tokens,
    'api/checks':handlers.checks,
    'favicon.ico':handlers.favicon,
    'public':handlers.public,
    'examples/error':handlers.exampleError
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