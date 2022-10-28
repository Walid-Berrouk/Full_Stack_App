let mongoose = require("mongoose");
let Product = require("../models/products");
mongoose.connect("mongodb+srv://walid:123@gomycodecluster.enyduws.mongodb.net/showcasedb?retryWrites=true&w=majority", { useNewUrlParser: true });

function getProducts(req, res) {
    try {
        Product.find({})
        .then(function(dbProduct) {
            console.log(dbProduct);
            res.send(dbProduct)
        })
        .catch(function(err) {
            console.log(err);
            throw new Error(err)
        });
    } catch (err) {
        res.send(err.message)
    }
}

function addProduct(req, res) {
    try {
        Product.insertMany([new Product(req.body)])
        .then(function(dbProduct) {
            console.log(dbProduct);
            if (dbProduct.acknowledged === false) {
                throw new Error("Incorrect Schema !")
            }
            res.send("Product Added !")
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
    getProducts,
    addProduct
}