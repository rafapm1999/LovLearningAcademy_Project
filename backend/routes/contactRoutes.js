const contactController = require("../Controller/contactController");
const router = require("express").Router();

router.post("/contact-us", contactController.postContactUsComment)

module.exports = router;