/*
* primary file of the server
*
*/

// Dependences
var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
// the server should respond to all request with string
var server = http.createServer(function(req,res){

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
    var chosenHandler=typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    // construct the data object to send to the handler
    var data={
        'trimmedPath':trimmedPath,
        'queryStringObject':queryStringObject,
        'method':method,
        'headers':headers,
        'payload':buffer
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
    
});
// start the server 
server.listen(config.port,function(){
console.log(`this server is listening on port ${config.port} in ${config.envName} mode`);
});
// define the handlers
var handlers={};
// sample handlers
handlers.sample=function(data,callback){
// callback a http status code,and a payload object
callback(406,{'name':'sample handler'});
};
// not found handlers
handlers.notFound=function(data,callback){
callback(404);
};
// define request router
var router = {
'sample':handlers.sample
};
