const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    info:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    level:{
        type: String,
        required: false,
    },
    quantityHours:{
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model("Courses", coursesSchema);