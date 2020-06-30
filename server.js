const express = require('express');
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 8888;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/getPictures', getPictures)
  .get('/checklogin', checkLogin)
  .get('/test', test)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://ggpdhnfjvkfypv:0dc2018984b219eae4c13974c4d693df65fbd57d30ea8a9fab1d59eee0a5cc98@ec2-52-70-15-120.compute-1.amazonaws.com:5432/d1isvsp31uiuib";
const pool = new Pool({connectionString: connectionString});

//put functions in other files
function test(req,res){
  console.log("Success");
  res.write("return data");
  res.end();
}

function getPictures(req,res){
  if (request.session.loggedin) {
		response.send('Login Success');
	} else {
		response.send('Please login to view!');
	}
	response.end();
}

function checkLogin(req,res){
  const email = req.query.email;
  const pass = req.query.password;

  getPersonFromDb(email, pass, function(error, result) {
    if (error || result == null || result.length != 1) {
    			res.status(500).json({success: false, data: error});
    		} else {
    			const person = result[0];
    			res.status(200).json(person);
          req.session.loggedin = true;
    		}
    	});
}

function getPersonFromDb(email, pass, callback){
  console.log("Getting User with email " + email + "and Pass " + pass);

  const query = 'SELECT user_id, first_name, last_name FROM users WHERE email = $1 AND password = $2';
  const params = [email, pass];

  pool.query(query, params, function(err, result) {

    if (err) {
      console.log("Error in query: ")
      console.log(err);
      callback(err, null);
    }

      console.log("Found result: " + JSON.stringify(result.rows));

      callback(null, result.rows);


  });
}
