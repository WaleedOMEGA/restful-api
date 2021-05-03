/*
 *
 * request handlers
 *
 *
 */
// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
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

/*
*
*
*
* HTML handlers
*
*
*/

// Index handlers
handlers.index=function(data,callback){
	
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Uptime monitoring Made simple',
			'head.description':'we offer free, simple uptime monitoring for http/https sites of all kinds. when your site goes down we\'ll send you a text to let you know',
			'body.class':'index'
		};

		// read in a template as a string
		helpers.getTemplate('index',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// create account
handlers.accountCreate=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Create an Account',
			'head.description':'Signup is easy and it only takes a few seconds.',
			'body.class':'accountCreate'
		};

		// read in a template as a string
		helpers.getTemplate('accountCreate',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// create new session
handlers.sessionCreate=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'login to your account',
			'head.description':'please enter your phone number and password to access to your account.',
			'body.class':'sessionCreate'
		};

		// read in a template as a string
		helpers.getTemplate('sessionCreate',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// session has been deleted
handlers.sessionDeleted=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'logged out',
			'head.description':'you have been logged out of your account.',
			'body.class':'sessionDeleted'
		};

		// read in a template as a string
		helpers.getTemplate('sessionDeleted',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// edit your account
handlers.accountEdit=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Account Settings',
			'body.class':'accountEdit'
		};

		// read in a template as a string
		helpers.getTemplate('accountEdit',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// account has been deleted
handlers.accountDeleted=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Account Deleted',
			'head.description':'Your account has been deleted',
			'body.class':'accountDeleted'
		};

		// read in a template as a string
		helpers.getTemplate('accountDeleted',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// create a new check
handlers.checksCreate=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Create A new Check',
			'body.class':'checksCreate'
		};

		// read in a template as a string
		helpers.getTemplate('checksCreate',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// Dashboard (view all checks)
handlers.checksList=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'Dashboard',
			'body.class':'checksList'
		};

		// read in a template as a string
		helpers.getTemplate('checksList',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// Edit a check
handlers.checksEdit=function(data,callback){
	// reject any request that is n't a GET
	if(data.method=='get'){

		// prepare data for interpolation
		var templateData={
			'head.title':'check Details',
			'body.class':'checksEdit'
		};

		// read in a template as a string
		helpers.getTemplate('checksEdit',templateData,function(err,str){
			if(!err && str){

				//  add the universal header and footer
				helpers.addUniversalTemplates(str,templateData,function(err,str){
					if(!err && str){
						
						// return that page as html
						callback(200,str,'html');
					}else{
						callback(500,undefined,'html');
					}
				});
			}else{
				callback(500,undefined,'html');
			}
		});
	}else{
		callback(405,undefined,'html');
	}
};

// favicon
handlers.favicon=function(data,callback){

	// reject any request that isn't a get
	if(data.method=='get'){

		// read in the favicon's data
		helpers.getStaticAsset('favicon.ico',function(err,data){
			if(!err && data){

				// callback the data
				callback(200,data,'favicon');
			}else{
				callback(500);
			}
		});
	}else{
		callback(405);
	}
};

// public assets
handlers.public=function(data,callback){
	// reject any request that isn't a get
	if(data.method=='get'){

		// get the filename being requested
		var trimmedAssetName=data.trimmedPath.replace('public/','').trim();
		if(trimmedAssetName.length > 0){

			// read in the asset's data
			helpers.getStaticAsset(trimmedAssetName,function(err,data){
				if(!err && data){
	
					// determine the content type (default to plain text)
					var contentType='plain';
					if(trimmedAssetName.indexOf('.css') > -1){
						contentType='css';
					}
					if(trimmedAssetName.indexOf('.png') > -1){
						contentType='png';
					}
					if(trimmedAssetName.indexOf('.jpg') > -1){
						contentType='jpg';
					}
					if(trimmedAssetName.indexOf('.ico') > -1){
						contentType='favicon';
					}

					// callback the data
					callback(200,data,contentType);
				}else{
					callback(404);
				}
			});
		}else{
			callback(404);
		}
	}else{
		callback(405);
	}
};

/*
*
*
* Json api handlers
*
*
*/

// Example Error
handlers.exampleError=function(data,callback){
	var err=new Error('this is an example error');
	throw(err);
};

// users - post
// required data : firstname,lastname,phone,password,tosAgreement
// optional data : null
handlers._users.post = function (data, callback) {
	// check that all required fields are filled out
	var firstName =
		typeof data.payload.firstName == 'string' &&
		data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
	var lastName =
		typeof data.payload.lastName == 'string' &&
		data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
	var phone =
		typeof data.payload.phone == 'string' &&
		data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
	var password =
		typeof data.payload.password == 'string' &&
		data.payload.password.trim().length > 0 ? data.payload.password.trim() 	: false;
	var tosAgreement =
		typeof data.payload.tosAgreement == 'boolean' &&
		data.payload.tosAgreement == true ? true : false;
	if ((firstName, lastName, phone, password, tosAgreement)) {
		// make sure that the user doesn't already exist
		_data.read('users', phone, function (err, data) {
			if (err) {
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
			} else {
				callback(400, {
					Error: 'A user with that phone number already exists',
				});
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// users - get
// required phone
// optional data:none
handlers._users.get = function (data, callback) {
	// check that phone number is valid
	var phone =
		typeof data.queryStringObject.phone == 'string' &&
		data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() 	: false;
	if (phone) {
		// get the token from the handlers
		var token =
			typeof data.headers.token == 'string' ? data.headers.token : false;
		// verify that the given token is valid for the phone number
		handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
			if (tokenIsValid) {
				// lookup the user
				_data.read('users', phone, function (err, data) {
					if (!err && data) {
						// remove the hashed password from the user object before returning it to the requester
						delete data.hashedPassword;
						callback(200, data);
					} else {
						callback(400, { Error: 'the specified user does not exist' });
					}
				});
			} else {
				callback(403, {
					Error: 'Missing required token in header,or token is invalid',
				});
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// users - put
// required data : phone
// optional data : firstName,lastName,password (at least one must be specified)
handlers._users.put = function (data, callback) {
	// check that phone number is valid
	var phone =
		typeof data.payload.phone == 'string' &&
		data.payload.phone.trim().length == 10 ? data.payload.phone.trim() 	: false;
	// check for optional fields
	var firstName =
		typeof data.payload.firstName == 'string' &&
		data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
	var lastName =
		typeof data.payload.lastName == 'string' &&
		data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() 	: false;
	var password =
		typeof data.payload.password == 'string' &&
		data.payload.password.trim().length > 0 ? data.payload.password.trim() 	: false;
	// error if the phone is invalid
	if (phone) {
		// error if nothing is sent to update
		if (firstName || lastName || password) {
			// get the token from the handlers
			var token =
				typeof data.headers.token == 'string' ? data.headers.token : false;
			// verify that the given token is valid for the phone number
			handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
				if (tokenIsValid) {
					// lookup the user
					_data.read('users', phone, function (err, userData) {
						if (!err && userData) {
							// update the fields necessart
							if (firstName) {
								userData.firstName = firstName;
							}
							if (lastName) {
								userData.lastName = lastName;
							}
							if (password) {
								userData.hashedPassword = helpers.hash(password);
							}
							// store the new update
							_data.update('users', phone, userData, function (err) {
								if (!err) {
									callback(200);
								} else {
									console.log(err);
									callback(500, { Error: 'colud not update the user' });
								}
							});
						} else {
							callback(400, { Error: 'the specified user does not exist' });
						}
					});
				} else {
					callback(403, {
						Error: 'Missing required token in header,or token is invalid',
					});
				}
			});
		} else {
			callback(400, { Error: 'Missing fields to update' });
		}
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// users - delete
// required field : phone
handlers._users.delete = function (data, callback) {
	// check that phone number is valid
	var phone =
		typeof data.queryStringObject.phone == 'string' &&
		data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() 	: false;
	if (phone) {
		// get the token from the handlers
		var token =
			typeof data.headers.token == 'string' ? data.headers.token : false;
		// verify that the given token is valid for the phone number
		handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
			if (tokenIsValid) {
				// lookup the user
				_data.read('users', phone, function (err, userData) {
					if (!err && userData) {
						_data.delete('users', phone, function (err) {
							if (!err) {
								
								// delete each of the checks associated with the user
								var userChecks=typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks :[];
								var checksToDelete=userChecks.length;
								if(checksToDelete > 0){
									var checksDeleted=0;
									var deletionErrors=false;

									// loop through the checks
									userChecks.forEach(function(checkId){

										// delete the check
										_data.delete('checks',checkId,function(err){
											if(err){
												deletionErrors=true;
											}
											checksDeleted++;
											if(checksDeleted==checksToDelete){
												if(!deletionErrors){
													callback(200);
												}else{
													callback(500,{'Error':'Errors encountered while attempting to delete all of the user checks. All checks may not have been deleted from the system successfuly'});
												}
											}
										});
									});
								}else{
									callback(200);
								}
							} else {
								callback(500, { Error: 'colud not delete the user' });
							}
						});
					} else {
						callback(400, { Error: 'the specified user does not exist' });
					}
				});
			} else {
				callback(403, {
					Error: 'Missing required token in header,or token is invalid',
				});
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
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

// container for all the tokens acceptableMethods
handlers._tokens = {};

// tokens - post
// required data :phone,password
// optional data : none
handlers._tokens.post = function (data, callback) {
	var phone =
		typeof data.payload.phone == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
	var password =
		typeof data.payload.password == 'string' &&	data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
	if (phone && password) {
		// lookup the user who matches the phone number
		_data.read('users', phone, function (err, userData) {
			if (!err && userData) {
				// hash the sent password,and compare it to the password stored in the user object
				var hashedPassword = helpers.hash(password);
				if (hashedPassword == userData.hashedPassword) {
					// if valid create a new token with a random name,set expiration date 1 hour in the future
					var tokenId = helpers.createRandomString(20);
					var expires = Date.now() + 1000 * 60 * 60;
					var tokenObject = {
						phone,
						id: tokenId,
						expires,
					};
					// store the token
					_data.create('tokens', tokenId, tokenObject, function (err, data) {
						if (!err) {
							callback(200, tokenObject);
						} else {
							callback(500, { Error: 'could not create new token' });
						}
					});
				} else {
					callback(400, {
						Error: 'Password did not match the specified user stored password',
					});
				}
			} else {
				callback(400, { Error: 'could not find the specified user' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// tokens - put
// required data : id,extend
// optional data : none
handlers._tokens.put = function (data, callback) {
	var id =
		typeof data.payload.id == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
	var extend =
		typeof data.payload.extend == 'boolean' && data.payload.extend == true ? true : false;
	if (id && extend) {
		// lookup the token
		_data.read('tokens', id, function (err, tokenData) {
			if (!err && tokenData) {
				//  check to make sure the token is not already expired
				if (tokenData.expires > Date.now()) {
					// set the expiration an hour from now
					tokenData.expires = Date.now() + 1000 * 60 * 60;
					// store the new updates
					_data.update('tokens', id, tokenData, function (err) {
						if (!err) {
							callback(200);
						} else {
							callback(500, { Error: 'could not update the token expiration' });
						}
					});
				}
			} else {
				callback(400, { Error: 'specified token does not exist' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields or fields are invalid' });
	}
};

// tokens - get
// required data : id
// optional data : none
handlers._tokens.get = function (data, callback) {
	// check that id is valid
	var id =
		typeof data.queryStringObject.id == 'string' &&
		data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
	if (id) {
		// lookup the token
		_data.read('tokens', id, function (err, tokenData) {
			if (!err && tokenData) {
				callback(200, tokenData);
			} else {
				callback(404);
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// tokens - delete
// required data : id
// optional data : none
handlers._tokens.delete = function (data, callback) {
	// check that the id is valid
	var id =
		typeof data.queryStringObject.id == 'string' &&
		data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
	if (id) {
		// lookup the tokens
		_data.read('tokens', id, function (err, data) {
			if (!err && data) {
				_data.delete('tokens', id, function (err) {
					if (!err) {
						callback(200);
					} else {
						callback(500, { Error: 'colud not delete the token' });
					}
				});
			} else {
				callback(400, { Error: 'the specified token does not exist' });
			}
		});
	} else {
		callback(400, { Error: 'Missing required fields' });
	}
};

// verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function (id, phone, callback) {
	// lookup the token
	_data.read('tokens', id, function (err, tokenData) {
		if (!err && tokenData) {
			// check that the token is for the given user and hasnot expired yet
			if (tokenData.phone == phone && tokenData.expires > Date.now()) {
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(false);
		}
	});
};

// checks handlers
handlers.checks = function (data, callback) {
	var acceptableMethods = ['post', 'get', 'put', 'delete'];
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._checks[data.method](data, callback);
	} else {
		callback(405);
	}
};

// container for all the checks acceptableMethods
handlers._checks = {};

// checks - post
// required data : protocol , url , method,successCodes,timeoutSeconds
// optional data : none
handlers._checks.post=function(data,callback){

    // validate inputs
    var protocol=typeof(data.payload.protocol)=='string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof(data.payload.url)=='string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    var method = typeof(data.payload.method)=='string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes=typeof(data.payload.successCodes)=='object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeoutSeconds=typeof(data.payload.timeoutSeconds)=='number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
    
    if(protocol && url && method && successCodes && timeoutSeconds){

        // get the token from the headers
        var token = typeof(data.headers.token)=='string'?data.headers.token : false;

        // lookup the user by reading the token
        _data.read('tokens',token,function(err,tokenDate){
            if(!err&&tokenDate){
                var userPhone=tokenDate.phone;

                // lookup the user data
                _data.read('users',userPhone,function(err,userData){
                    if(!err&&userData){
                        var userChecks=typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks :[];

                        // verify that the user has less than the number of max checks per user
                        if(userChecks.length<config.maxChecks){

                            // create a random id for the check
                            var checkId=helpers.createRandomString(20);

                            // create the check object,and include the user's phone
                            var checkObject={
                                'id':checkId,
                                userPhone,
                                protocol,
                                url,
                                method,
                                successCodes,
                                timeoutSeconds
                            };

                            // save the object
                            _data.create('checks',checkId,checkObject,function(err){
                                if(!err){

                                    // add the check id to the user's object
                                    userData.checks=userChecks;
                                    userData.checks.push(checkId);

                                    // save the new user data
                                    _data.update('users',userPhone,userData,function(err){
                                        if(!err){

                                            // return the data about new check
                                            callback(200,checkObject);
                                        }else{
                                            callback(500,{'Error':'Could not update the user with the new check'});
                                        }
                                    });
                                }else{
                                    callback(500,{'Error':'Could not create the new check'});
                                }
                            });
                        }else{
                            callback(400,{'Error':'the user already has the maximum number of checks('+config.maxChecks+')'});
                        }
                    }else{
                        callback(403);
                    }
                });
            }else{
                callback(403);
            }
        });
    }else{
        callback(400,{'Error':'Missing required inputs, or inputs are invalid'});
    }
};

// checks - get
// required data : id
// optional data : none
handlers._checks.get=function(data,callback){

	// check that the id is valid
	var id = typeof(data.queryStringObject.id)=='string' && data.queryStringObject.id.trim().length==20 ? data.queryStringObject.id:false;
	if(id){

		// lookup the check
		_data.read('checks',id,function(err,checkData){
			if(!err&&checkData){
				
				// get the token from the headers
				var token=typeof(data.headers.token)?data.headers.token:false;
				// verify that the given token is valid and belongs to the user who created
		handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
			if (tokenIsValid) {

				// return the check data
				callback(200,checkData);
			} else {
				callback(403);
			}
		});
			}else{
				callback(404);
			}
		});
	}else{
		callback(400,{'Error':'Missing Required Field'});
	}
};

// checks - put
// required data : id
// optional data : protocol , url , method,successCodes,timeoutSeconds
handlers._checks.put=function(data,callback){

	// check for the required field
	var id = typeof(data.payload.id)=='string' && data.payload.id.trim().length==20 ? data.payload.id:false;

	// check for the optional fields
	var protocol=typeof(data.payload.protocol)=='string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof(data.payload.url)=='string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    var method = typeof(data.payload.method)=='string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes=typeof(data.payload.successCodes)=='object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeoutSeconds=typeof(data.payload.timeoutSeconds)=='number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
    
	// check to make sure id is valid
	if(id){

		// check to make sure one or more optional fields has been sent
		if(protocol || url || method || successCodes || timeoutSeconds){
			// lookup the check
			_data.read('checks',id,function(err,checkData){
				if(!err && checkData){
					
					// get the token from the headers
					var token=typeof(data.headers.token)?data.headers.token:false;
					// verify that the given token is valid and belongs to the user who created
					handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
						if(tokenIsValid){

							// update the check where necessary
							if(protocol){
								checkData.protocol=protocol;
							}
							if(url){
								checkData.url=url;
							}
							if(method){
								checkData.method=method;
							}
							if(successCodes){
								checkData.successCodes=successCodes;
							}
							if(timeoutSeconds){
								checkData.timeoutSeconds=timeoutSeconds;
							}

							// store the new updates
							_data.update('checks',id,checkData,function(err){
								if(!err){
									callback(200);
								}else{
									callback(500,{'Error':'Could not update the check'});
								}
							});
						}else{
							callback(403);
						}
					});
				}else{
					callback(400,{'Error':'Check id did not exist'});
				}
			});

		}else{
			callback(400,{'Error':'Missing Fields to update'});
		}
	}else{
		callback(400,{'Error':'Missing Required Fields'});
	}
};

// checks - delete
// required-data : id
// optional data : none
handlers._checks.delete=function(data,callback){

	// check that the id is valid
	var id = typeof(data.queryStringObject.id)=='string' && data.queryStringObject.id.trim().length==20 ? data.queryStringObject.id:false;
	if(id){

		// lookup the check
		_data.read('checks',id,function(err,checkData){
			if(!err && checkData){

				// get the token from the headers
				var token=typeof(data.headers.token)?data.headers.token:false;

				// verify that the given token is valid and belongs to the user who created
				handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
					if(tokenIsValid){

						// delete the check Data
						_data.delete('checks',id,function(err){
							if(!err){

								// lookup the user
								_data.read('users',checkData.userPhone,function(err,userData){
									if(!err && userData){
										var userChecks=typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks :[];

										// remove the delete check from thier list of checks
										var checkPosition=userChecks.indexOf(id);
										if(checkPosition> -1){
											userChecks.splice(checkPosition,1);

											// re save the user data
											_data.update('users',checkData.userPhone,userData,function(err){
												if(!err){
													callback(200);
												}else{
													callback(500,{'Error':'could not update the user'});
												}
											});
										}else{
											callback(500,{'Error':'could not find the check on the user object'});
										}
									}else{
										callback(500,{'Error':'could not find the user who created the check'});
									}
								});
							}else{
								callback(500,{'Error':'could not delete the check data'});
							}
						});
					}else{
						callback(403);
					}
				});
			}else{
				callback(400,{'Error':'the specified check id does not exist'});
			}
		});
	}else{
		callback(400,{'Error':'Missing Required Field'});
	}
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