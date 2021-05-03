/*
*
*
*
* cli-related tasks
*
*
*/

// Dependencies
var readLine=require('readline');
var util=require('util');
var debug=util.debuglog('cli');
var events=require('events');
class _events extends events{}
var e = new _events();

// istantiate the cli module object
var cli={};

// input processor
cli.processInput=function(str){
    str=typeof(str)=='string' && str.trim().length > 0 ? str.trim() : false;

    // only process the input if the user actually wrote something,otherwise ignore
    if(str){
        // Codify the unique strings that identify the different unique questions allowed be the asked
        var uniqueInputs = [
          'man',
          'help',
          'exit',
          'stats',
          'list users',
          'more user info',
          'list checks',
          'more check info',
          'list logs',
          'more log info'
        ];
    
        // Go through the possible inputs, emit event when a match is found
        var matchFound = false;
        var counter = 0;
        uniqueInputs.some(function(input){
          if(str.toLowerCase().indexOf(input) > -1){
            matchFound = true;
            // Emit event matching the unique input, and include the full string given
            e.emit(input,str);
            return true;
          }
        });
    
        // If no match is found, tell the user to try again
        if(!matchFound){
          console.log("Sorry, try again");
        }
    
      }
};

// init script
cli.init=function(){
    
    // Send to console, in dark blue
    console.log('\x1b[34m%s\x1b[0m','The CLI is running');

    // start the interface
    var _interface=readLine.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:''
    });

    // create an initial prompet
    _interface.prompt();

    // handle each line of input separately
    _interface.on('line',function(str){

        // send to the input processor
        cli.processInput(str);

        // re-initialize the prompt afterwards
        _interface.prompt();
    });

    // if the user stop the cli, kill the associated process
    _interface.on('close',function(){
        process.exit(0);
    });
};

// exports the module
module.exports=cli;