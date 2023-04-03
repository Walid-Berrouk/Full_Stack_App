const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

let User = require("../models/users");

const secretKey = 'youCantCatchme098765%^&*##@'

async function signIn(req, res) {
    try {

        let users;

        User.find()
        .then(async function(dbUser) {
            users = dbUser
            // console.log(dbUser);
            let isValid = false
            let user = users.find(user => user.email == req.body.email)
    
            if (user) {
                const check = await bcrypt.compare(req.body.password, user.password)
    
                if (check) {
                    jwt.sign({email: req.body.email, password: req.body.password}, secretKey, (err, token) => {
                        res.send({
                            token
                        })
    
                        console.log(token);
                    })
                }
            } else {
                console.log("Invalid User !")
                res.writeHead(404)
                res.end()
            }
        })
        .catch(function(err) {
            console.log(err);
            throw new Error(err)
        });

       




    } catch (error) {
        console.log(error.message)
        res.writeHead(500)
        res.end("Error While SignIn in, please try later")
    }
}

module.exports = { signIn }