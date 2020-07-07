const express = require('express');
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 8888;

app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.get('/getPictures', getPictures);
app.get('/checklogin', checkLogin);
app.get('/isLoggedIn', isLoggedIn);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://ggpdhnfjvkfypv:0dc2018984b219eae4c13974c4d693df65fbd57d30ea8a9fab1d59eee0a5cc98@ec2-52-70-15-120.compute-1.amazonaws.com:5432/d1isvsp31uiuib?ssl=true';
const pool = new Pool({connectionString: connectionString});


function isLoggedIn(req,res) {
  if (req.session.loggedin){
    res.send(true);
  }
	else {
  	res.send(false);
  }
	res.end();
}

function getPictures(req,res){
  if (req.session.loggedin) {
		user_id = req.session.userId;

		getPicturesLink(user_id, function(error, result) {
			if (error) {
	    	res.status(500).json({success: false, data: error});
	      console.log("Database connnection error: " + error);
	    }
			else if (result == null || result.length != 1){
				console.log('No results found');
				res.send('-2');
			}
			else {
	    	const link = result[0];
				res.status(200).json(link);
	    }
		});
	}
	else {
		res.send('-1');
	}
	res.end();
}

function getPicturesLink(user_id, callback){
	const query = 'SELECT a.link from albums a, users u, users_albums ua ' +
	 							'WHERE ua.album_id = a.album_id AND ua.user_id = $1';
	const id = [user_id];

	pool.query(query, id, function(err, result) {
    if (err) {
      console.log("Error in query: " + err);
      callback(err, null);
    }

    console.log("Found result: " + JSON.stringify(result.rows));

    callback(null, result.rows);
  });
}

function checkLogin(req,res){
	debugger;
  const email = req.query.email;
  const pass = req.query.password;

  getPersonFromDb(email, pass, function(error, result) {
    if (error) {
			console.log("Database connnection error: " + error);
    	res.status(500).json({success: false, data: error});
    }
		else if (result == null || result.length != 1){
			console.log('No results found');
			res.send('-1');
		}
		else {
    	const person = result[0];
			req.session.loggedin = true;
			req.session.userId = result[0].user_id;
			req.session.firstName = result[0].first_name;
			req.session.lastName = result[0].last_name;
    	res.status(200).json(person);
    }
  });
	res.end();
}

function getPersonFromDb(email, pass, callback){
	const query = "Select user_id, first_name, last_name FROM users WHERE email = $1 AND password = $2";
	const params = [email, pass];

	pool.query(query, params, function(err,results){
		if (err) {
			console.log("Error in DB: " + err);
			callback(err, null);
		}
		else{
			console.log("Found Results" + JSON.stringify(results.rows));
			callback(null, results.rows);
		}
});
}
