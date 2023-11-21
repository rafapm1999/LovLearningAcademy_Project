/* const User = require("../Model/UserModel"); */
/* const jwt = require("jsonwebtoken"); */

const verifyToken = (req, res) => {
    try {
        const token = req.header("auth-token");
        console.log(token);
        if (!token) {
            return res.status(401).json({
                status: "ko",
                data: "Access Denied",
                error,
            });
        } else {
            console.log('Data conseguida');
            
            return res.status(200).json({
                status: "ok",
                data: "Verify Token",
                error: null,
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "ko",
            data: null,
            error: error,
        });
    } 
}
module.exports = { verifyToken };