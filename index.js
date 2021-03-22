/*
* primary file of the server
*
*/

// Dependences
var http = require('http');
var url = require('url');
var stringDecoder=require('string_decoder').StringDecoder;
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
    // send the response
    res.end('omega\n');
    // log the request path
    console.log('request recieved with this payload :',buffer);
});
    
});
// start the server and have it listen on port 3000
server.listen(3000,function(){
console.log('this server is listening on port 3000 now');
});
