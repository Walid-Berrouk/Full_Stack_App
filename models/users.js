const mongoose = require("mongoose")

let Schema = mongoose.Schema

let UserSchema = new Schema ({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


// This creates our model from the above schema, using mongoose's model method
let User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;