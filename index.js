const express = require("express")
const cors =require("cors")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const logger = require("morgan")
const mongoose = require("mongoose");

// Controlers
const { getProducts, addProduct } = require("./controllers/products")
const { getUsers, addUser, getUser } = require("./controllers/users")
const { signIn } = require('./controllers/signIn')
const verifyToken = require("./middlewares/verifyToken")

// const helmet = require('helmet')
const secretKey = 'youCantCatchme098765%^&*##@'

// Init the app
const app = express()

// Connect to db 
// TODO : Change this before starting the server
mongoose.connect("mongodb://127.0.0.1:27017/showcasedb?retryWrites=true&w=majority", { useNewUrlParser: true });

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(logger())
// app.use(helmet())

// Static Files
app.use(express.static('public'))

// Routes

// Users
app.get('/users', getUsers)
app.get('/user/:id', getUser)
app.post('/user', addUser)

// Login
app.post("/api/signIn", signIn)

// Products
app.get('/products',verifyToken, (req, res, next) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            next()
        }
    })
}, getProducts)

// Adding single product (Product has an image)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/product', addProduct)

// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))