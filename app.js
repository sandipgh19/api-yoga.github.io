// Requiring module
const express = require('express');
const admin = require('firebase-admin');

// Creating express object
const app = express();
app.use(express.json());

// Port Number
const PORT = process.env.PORT || 5000;

// Handling GET request
app.get('/', (req, res) => {
	res.send('A simple Node App is '
		+ 'running on this server')
	res.end()
})

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yoga-haryana-default-rtdb.firebaseio.com/"
});
const db = admin.database();

var notAuthorised = "You are not authorized";
var addedSuccessfully = "Data added successfully";
var deleteSuccessfully = "Data deleted success"


app.get('/api/management', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/management');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/event', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/event');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/gallery', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/gallery');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/aboutUs', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/aboutUs');
				query.once("value", function(snapshot) {
					return res.status(200).send(snapshot);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/contacts', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/contacts');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/recognitions', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/recognitions');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/chronology', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/chronology');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.get('/api/downloads', (req, res) => {
	(async() => {
		try {
			verifyToken(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				let query = db.ref('/downloads');
				let response = [];
				query.once("value", function(snapshot) {
					snapshot.forEach(function(data) {
                   		response.push(data.val());
				})
				return res.status(200).send(response);
			}, function (errorObject) {
				return res.status(errorObject.code).send(errorObject);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.post('/api/contacts', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = body['id'];
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/contacts');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});




app.delete('/api/contacts/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
			
				var id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/contacts/'+id);
				query.remove().then(parserBody => {
					return res.status(200).send(id);
				}).catch(err=> {
					return res.status(500).send(err);
				})
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});


app.post('/api/chronology', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = body['id'];
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/chronology');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.delete('/api/chronology/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
			
				var id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/chronology/'+id);
				query.remove().then(parserBody => {
					return res.status(200).send(id);
				}).catch(err=> {
					return res.status(500).send(err);
				})
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.post('/api/recognitions', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = body['id'];
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/recognitions');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.post('/api/management/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/management/');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.delete('/api/management/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
			
				var id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/management/'+id);
				query.remove().then(parserBody => {
					return res.status(200).send(id);
				}).catch(err=> {
					return res.status(500).send(err);
				})
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.post('/api/event/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/event/');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
	
});

app.post('/api/gallery/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/gallery/');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.delete('/api/recognitions/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
			
				var id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/recognitions/'+id);
				query.remove().then(parserBody => {
					return res.status(200).send(id);
				}).catch(err=> {
					return res.status(500).send(err);
				})
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.post('/api/downloads', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
				const body = req.body;
				const id = body['id'];
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/downloads');
				query.child(id).set(body).then(_parserBody => {
					return res.status(200).send(body);
				}).catch(err => {
					return res.status(500).send(err);
				});
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});

app.delete('/api/downloads/:id', (req, res) => {
	(async() => {
		try {
			verifyTokenForAdmin(req, res).then(function(autherticate) {
				if(autherticate==null) {
					return res.status(401).send(notAuthorised);
				}
			
				var id = req.params.id;
				if(id==null) {
					return res.status(500).send("error");
				}
				let query = db.ref('/downloads/'+id);
				query.remove().then(parserBody => {
					return res.status(200).send(id);
				}).catch(err=> {
					return res.status(500).send(err);
				})
			});
			
		}catch (error) {
            return res.status(500).send(error);
        }
	}) ();
});


async function verifyToken(req, res, next) {
	if(req!=null && req.headers!=null) {
		const idToken = req.header('idToken');
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		if(decodedToken) {
			console.log("verified for get request");
			return decodedToken.uid;
		}else {
			return null;
		}
	}catch(e) {
		console.log('catch verify '+e);
		return null;
	}
	}else {
			console.log('else');
			return null;
		}
}

async function verifyTokenForAdmin(req, res, next) {
	if(req!=null && req.headers!=null) {
		const idToken = req.header('idToken');
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		if(decodedToken) {
			console.log("verified "+decodedToken.uid);
			return decodedToken.uid;
		}else {
			return null;
		}
	}catch(e) {
		console.log('catch verify '+e);
		return null;
	}
	}else {
			console.log('else');
			return null;
		}
}

// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));
