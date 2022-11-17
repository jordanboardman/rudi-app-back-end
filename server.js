const express = require('express');
const bodyParser = require('body-parser');
const { users } = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const logger = require('./logger');

const { sendEmail } = require('./sendEmail');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const methodOverride = require('method-override');
const session = require('express-session');
const key = process.env.KEY;

const axios = require('axios');

sgMail.setApiKey(process.env.SENDGRIDAPIKEY)

const app = express()
app.set('view engine', 'ejs')

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'profession speaker sofa shine cable conglomerate efflux studio bang money', resave: false, saveUninitialized: false}));

app.use(express.static("public"));

//Create a user when submit on signup page is clicked
app.post('/createuser', async (req, res) => {
    req.session.error = ''

    //check if username is in users table
    const userUserName = await users.findOne({
        where: {
            username : req.body.username
        }
        
    })

    //check if email is in users table
    const userEmail = await users.findOne({
        where: {
            email : req.body.email
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


