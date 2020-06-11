var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED; //importamos el archivo con el seed

// ================================================
// Opcion 2. Verificar token --- Middleware
// ================================================
// Todas las peticiones a partir de este punto, seran verificadas con un token

exports.verificaToken = function(req, res, next) {

    var token = req.query.token; //recibimo el token por la url, si el usuario no envio algun token, el token va a ser undefined   
    //verificamos validez del token
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({ //401 : no autorizado
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario; // extraigo lo que esta en el decoded y lo coloco en el request

        next(); //puedes continuar con las siguiente lineas de codigo

        // return res.status(200).json({ //401 : no autorizado
        //     ok: true,
        //     decoded: decoded //solo usamos para ver los que tiene el decoded
        // });

    });
};