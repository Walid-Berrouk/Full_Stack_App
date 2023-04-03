let User = require("../models/users");

const bcrypt = require("bcrypt");

function getUsers(req, res) {
    try {
        User.find()
        .then(function(dbUser) {
            console.log(dbUser);
            res.send(dbUser)
        })
        .catch(function(err) {
            console.log(err);
            throw new Error(err)
        });
    } catch (err) {
        res.send(err.message)
    }
}

function getUser(req, res) {
    try {
        User.find({ _id: req.params.id})
        .then(function(dbUser) {
            console.log(dbUser);
            res.send(dbUser)
        })
        .catch(function(err) {
            console.log(err);
            throw new Error(err)
        });
    } catch (err) {
        res.send(err.message)
    }
}

async function addUser(req, res) {
    try {
        console.log(req.body)

        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = new User(req.body)
        user.save()
        .then(function(dbUser) {
            console.log(dbUser);
            if (dbUser.acknowledged === false) {
                throw new Error("Incorrect Schema !")
            }
            res.send("User Added !")
        })
        .catch(function(err) {
            //throw new Error(err.message)
            res.send(err.message)
        });
    } catch (err) {
        res.send(err.message)
    }
}

module.exports = {
    getUsers,
    addUser,
    getUser
}