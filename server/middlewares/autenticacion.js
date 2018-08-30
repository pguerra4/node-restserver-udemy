const jwt = require('jsonwebtoken');


//=====================
// Verificar el token
//=====================

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization'); //Authorization


    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    })

    // console.log(token);



}


//=====================
// Verificar el rol
//=====================
let verificaAdminRol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Rol no válido'
            }
        });
    }
    next();
}



//=====================
// Verificar el token img
//=====================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })
}


module.exports = {
    verificaToken,
    verificaAdminRol,
    verificaTokenImg
}