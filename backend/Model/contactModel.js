const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userComment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contact", contactSchema); 