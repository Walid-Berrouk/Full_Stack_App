let Product = require("../models/products");
const multer = require('multer');

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


// Add Product
var storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )
    }
});
 
var upload = multer({ storage: storage }).single('image');

function addProduct(req, res) {
    try {

        upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
            // See the data sent :

            // Product data 
            console.log(JSON.parse(req.body.product));

            // The file Uploaded
            console.log(req.file);


            // Construct object
            const obj = {
                ...JSON.parse(req.body.product),
                link: '/images/' + req.file.filename
            }

            // Save in database
            Product.insertMany([new Product(obj)])
            .then(function(dbProduct) {
                console.log(dbProduct);
                if (dbProduct.acknowledged === false) {
                    throw new Error("Incorrect Schema !")
                }

                // All good
                res.status(200).send("Product Added !")
            })
            .catch(function(err) {
                //throw new Error(err.message)
                res.send(err.message)
            });

            // All good
            // return res.sendStatus(200);
        })

    } catch (err) {
        res.send(err.message)
    }
}

module.exports = {
    getProducts,
    addProduct
}