/*
*
* request handlers
*
*
*/
// Dependencies
var _data=require('./data');
var helpers = require('./helpers');
// define the handlers
var handlers = {};

// users handlers
handlers.users = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

// container for the users submethods
handlers._users = {};

// users - post
// required data : firstname,lastname,phone,password,tosAgreement
// optional data : null
handlers._users.post = function (data, callback) {
    // check that all required fields are filled out
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof data.payload.lastName == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    if(firstName,lastName,phone,password,tosAgreement){
    // make sure that the user doesn't already exist
        _data.read('users',phone,function(err,data){
            if(err){
                // hash the password
                var hashedPassword = helpers.hash(password);
                if (hashedPassword) {
                    // create the user object
                    var userObject = {
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        hashedPassword: hashedPassword,
                        tosAgreement: true,
                    };
                    // store the user
                    _data.create('users', phone, userObject, function (err) {
                        if (!err) {
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500, { Error: 'Could not create the new user' });
                        }
                    });
                } else {
                    callback(500, { Error: 'Could not hash the user password' });
                                }
                
            }else{
                callback(400, { Error: 'A user with that phone number already exists' });
            }
        });
    }else{
        callback(400,{'Error':'Missing required fields'});
    }
};

// users - get
// required phone
// optional data:none
// todo only let an authenticated user can access thier object.
handlers._users.get = function (data, callback) {
    // check that phone number is valid
    var phone = typeof (data.queryStringObject.phone)=='string' && data.queryStringObject.phone.trim().length ==10 ? data.queryStringObject.phone.trim(): false;
    if(phone){
        // lookup the user
        _data.read('users',phone,function(err,data){
if(!err && data){
    // remove the hashed password from the user object before returning it to the requester
    delete data.hashedPassword;
    callback(200,data);
}else{
    callback(400,{'Error':'the specified user does not exist'});
}
        });
    }else{
        callback(400,{'Error':'Missing required fields'});
    }
};

// users - put
// required data : phone
// optional data : firstName,lastName,password (at least one must be specified)
// todo only let an authenticated user can update thier object, don't let them update anyone else's
handlers._users.put = function (data, callback) {
    // check that phone number is valid
    var phone = typeof (data.payload.phone)=='string' && data.payload.phone.trim().length ==10 ? data.payload.phone.trim(): false;
    // check for optional fields
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof data.payload.lastName == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    // error if the phone is invalid
    if(phone){
    // error if nothing is sent to update
    if(firstName || lastName || password){
// lookup the user
_data.read('users',phone,function(err,userData){
    if(!err && userData){
        // update the fields necessart
        if(firstName){
            userData.firstName = firstName;
        }
        if(lastName){
            userData.lastName = lastName;
        }
        if(password){
            userData.hashedPassword =helpers.hash(password);
        }
        // store the new update
        _data.update('users',phone,userData,function(err){
            if(!err){
callback(200);
            }else{
                console.log(err);
                callback(500,{'Error':'colud not update the user'});
            }
        });
    }else{
        callback(400,{'Error':'the specified user does not exist'});
    }
            });
    }else{
        callback(400,{'Error':'Missing fields to update'});
    }
    }else{
        callback(400,{'Error':'Missing required fields'});
    }
};

// users - delete
// required field : phone
//  todo only let an authenticated user can delete thier object, don't let them delete anyone else's
// todo cleanup (delete) any other data files associated with the user
handlers._users.delete = function (data, callback) {
    // check that phone number is valid
    var phone = typeof (data.queryStringObject.phone)=='string' && data.queryStringObject.phone.trim().length ==10 ? data.queryStringObject.phone.trim(): false;
    if(phone){
        // lookup the user
        _data.read('users',phone,function(err,data){
if(!err && data){
    _data.delete('users',phone,function(err){
if(!err){
    callback(200);
}else{
    callback(500,{'Error':'colud not delete the user'});
}
    });
}else{
    callback(400,{'Error':'the specified user does not exist'});
}
        });
    }else{
        callback(400,{'Error':'Missing required fields'});
    }
};

// tokens handlers
handlers.tokens = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback);
    } else {
        callback(405);
    }
};

// container for all the tokens methods
handlers._tokens ={};

// tokens - post
// required data : phone password
// optional data : none
handlers._tokens.post=function (data, callback) {
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    if(phone && password){

    }else{
        
    }
};

// tokens - get
handlers._tokens.get=function (data, callback) {

};

// tokens - put
handlers._tokens.put=function (data, callback) {

};

// tokens - delete
handlers._tokens.delete=function (data, callback) {

};



// ping handlers
handlers.ping = function (data, callback) {
	callback(200);
};

// not found handlers
handlers.notFound = function (data, callback) {
	callback(404);
};

// export the module
module.exports = handlers;