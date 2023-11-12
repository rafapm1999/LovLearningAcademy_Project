/* const User = require("../Model/UserModel"); */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
    /* try { */
        const token = req.header("auth-token");
        console.log(token);
        if (!token) {
            return res.status(401).json({
                status: "Fail",
                data: "Access Denied",
                error,
            });
        } else {
            console.log('Data conseguida');
            
            return res.status(200).json({
                status: "Succesfully",
                data: "Verify Token",
                error: null,
            });
        }
        //Verificamos el token con un try catch
        /* try {
            const verified = jwt.verify(token, process.env.TOKEN);
            console.log(verified);
            
            req.user = verified;
            return res.status(200).json({
                status: "Succesfully",
                data: "Verify Token",
                error: null,
            });
        } catch (error) {
            try {
                //Creamos la contante verified para verificar el token utilizando
                const verified = jwt.verify(token, process.env.REFRESH_TOKEN);
                console.log(verified);
                //Hacemos que req.user tenga el token verificado
                req.user = verified;

                //Damos paso al siguiente middleware de la cadena
                return res.status(200).json({
                    status: "Succesfully",
                    data: "Create new Token",
                    error: null,
                });
            } catch (error) {
                //Si algo falla enviamos error 400
                return res.status(400).json({
                    status: "Error",
                    data: "Not Refresh Token",
                    error,
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            data: "Not Refresh Token",
            error,
        });
    } */
}
module.exports = { verifyToken };