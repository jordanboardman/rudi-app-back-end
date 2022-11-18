const express = require('express');

const bodyParser = require('body-parser');
// const rudi_users = require('./rudi_users');
const {rudi_users} = require('./models')
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


  app.use(express.json())
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });
  
//Create a user when submit on registration page is clicked
app.post('/createuser', async (req, res) => {
    req.session.error = ''
    //check if username is in users table
    const username = await rudi_users.findOne({
        where: {
            username : req.body.username
        }
        
    })    
    // add new user to table
    if(username == null && req.session.error == '') {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                rudi_users.create({
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                    code: req.body.code
                })
            })
        })
    }
    if (req.session.error == '') {
        res.send('added user')
    }
    else {
        res.send('did not add user')
    }
    
})

// // checks user-entered password against database and renders the home page if user and password match/are found in database
// // if user-entered password is not in database/does not match username in database, renders the login page
app.post('/checkpassword', async (req, res)=> {
    const user = await rudi_users.findOne({
        where: {
            username : req.body.username
        }
    })
    if(user!=null) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {

            if(result == true) {
                username = user.username
                req.session.userId = user.id
                res.send("logged in")
            }
            else {
                res.send('did not log in')
            }
        });
    }
    else {
        res.send('did not log in')
    }
})


var port = process.env.PORT || 3001;

app.listen(port);
