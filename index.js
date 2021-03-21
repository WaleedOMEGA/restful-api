/*
* primary file of the server
*
*/

// Dependences
var http = require('http');
// the server should respond to all request with string
var server = http.createServer(function(req,res){
    res.end('omega\n');
});
// start the server and have it listen on port 3000
server.listen(3000,function(){
console.log('this server is listening on port 3000 now');
});
