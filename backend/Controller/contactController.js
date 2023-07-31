const Contact = require("../Model/contactModel");

const postContactUsComment = async (req, res) => {
    try {
        const { name, lastName, email, userComment } = req.body;
        const newContactComment = new Contact({
            name,
            lastName,
            email,
            userComment
        });
        const contactComment = await newContactComment.save();
        res.status(201).json({
            status: "succesfully",
            data: "Your comment is send to our offices",
            error: null,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
};

module.exports = { postContactUsComment };