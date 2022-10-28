let mongoose = require("mongoose");
let User = require("../models/users");
mongoose.connect("mongodb+srv://walid:123@gomycodecluster.enyduws.mongodb.net/showcasedb?retryWrites=true&w=majority", { useNewUrlParser: true });

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

async function addUser(req, res) {
    try {
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
}