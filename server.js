const express = require('express');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'rudi_users',
  password: 'root',
  port: 5432,
});
const bodyParser = require('body-parser');
const rudi_users = require('./rudi_users.js');
const bcrypt = require('bcrypt');
const saltRounds = 8;

const jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
const session = require('express-session');
const key = process.env.KEY;

const axios = require('axios');

const app = express()
app.set('view engine', 'ejs')

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'profession speaker sofa shine cable conglomerate efflux studio bang money', resave: false, saveUninitialized: false}));

app.use(express.static("public"));



const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM rudi_users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, password, role, code } = body
      pool.query('INSERT INTO rudi_users (username, password, role, code) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, role, code], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new user has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteUser = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM rudi_users WHERE username = $1', [username], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with username: ${username}`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
  }
  

  app.use(express.json())
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });
  
  app.get('/', (req, res) => {
    rudi_users.getUsers()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  
  app.post('/rudi_users', (req, res) => {
    rudi_users.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  
  app.delete('/rudi_users/:username', (req, res) => {
    rudi_users.deleteUser(req.params.username)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })



//Create a user when submit on signup page is clicked
app.post('/createuser', async (req, res) => {
    req.session.error = ''

    //check if username is in users table
    const userUserName = await users.findOne({
        where: {
            username : req.body.username
        }
        
    })
    
    var regex = /^[A-Za-z]+$/;
    var userregex = /^[a-z0-9_-]{3,16}$/; // Letters, Numbers, Underscore and dash, min 3, max 16
    var pwregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/

    // making checks on regex
    if(userregex.test(req.body.username) == false){
        req.session.error = 'Please enter a valid username.'
    }
    else if(pwregex.test(req.body.password) == false){
        req.session.error = "Please enter a valid password"
    }
    else if(req.body.password.length < 6 || req.body.password.length > 20){
        req.session.error = 'Please enter a password between 6-20 characters.'
    }
    else if(req.body.password != req.body.confirmpassword) {
        req.session.error = "Passwords do not match"
    }
    else {
        req.session.error = ''
    }
    
    // add new user to table
    if(userUserName == null && userEmail == null && req.session.error == '') {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                users.create({
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                    code: req.body.code
                })
            })
        })
    }
    else if(req.session.error == '') {
        req.session.error = 'Username already exists or email already used'
    }
    if (req.session.error == '') {
        res.redirect('/login')
    }
    else {
        res.redirect('/signup')
    }
    
})

// checks user-entered password against database and renders the home page if user and password match/are found in database
// if user-entered password is not in database/does not match username in database, renders the login page
app.post('/checkpassword', async (req, res)=> {
    const user = await users.findOne({
        where: {
            username : req.body.username
        }
    })
    if(user!=null) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {

            if(result == true) {
                username = user.username
                req.session.userId = user.id
                res.redirect("/")
            }
            else {
                res.redirect('/login')
            }
        });
    }
    else {
        res.redirect('/login')
    }
})

var port = process.env.PORT || 3001;

app.listen(port);
