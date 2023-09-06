const User = require("../Model/loginModel");

const wantTheCourse = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.course)
        console.log("Paso 1 completado");
        res.status(200).json({
            status: "Conseguido",
            data,
            error: null
        })
    } catch (error) {
        console.log('Algo ha salido mal');
        
    }
}
module.exports = { wantTheCourse };