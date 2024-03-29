const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: false,
    },
    quantityHours: {
        type: Number,
        required: false,
    },
    visible: {
        type: Boolean,
        required: true,
    },
    subject: {
        title: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        }
    }
});

module.exports = mongoose.model("Courses", coursesSchema);