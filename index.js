const express = require("express")
const cors =require("cors")
const jwt = require("jsonwebtoken")
const logger = require("morgan")
const { getProducts, addProduct } = require("./controllers/products")
const { getUsers, addUser } = require("./controllers/users")


// Init the app
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(logger())

// Endpoints
// /products
// /product
// /users
// /user
// /api/signIn

// Routes

// Users
app.get('/users', getUsers)
// app.get('/user/:id', getUser)
app.post('/user', addUser)

// Products
app.get('/products', getProducts)
app.post('/product', addProduct)


// Login
// app.post("/api/signIn", signIn)

// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))