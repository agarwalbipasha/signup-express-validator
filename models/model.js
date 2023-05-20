const mongoose = require('mongoose');

const formSchema = {
    fname: {
        required: true,
        type: String,
        errorMessage: "Please enter a valid first name"
    },
    lname: {
        required: true,
        type: String,
        errorMessage: "Please enter a valid last name"
    },
    email: {
        required: true,
        unique: true,
        type: String,
        errorMessage: "Please enter a valid mail ID"
    },
    password: {
        required: true,
        type: String,
        errorMessage: "Please enter a valid password"
    },
    confirmPassword: {
        type: String,
        errorMessage: "Please enter the same password"
    }

}

const Data = mongoose.model("Data", formSchema);


module.exports = Data;