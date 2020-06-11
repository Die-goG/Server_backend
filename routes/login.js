var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED; //importamos el archivo con el seed 


// '/' :cuando alguien se dirija a la ruta raiz de usuarios osea /login
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                mansaje: 'Credenciales incorrects - email',
                errors: err
            });
        }

        //vamos a verificar el  password
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mansaje: 'Credenciales incorrects - password',
                errors: err
            });
        }

        usuarioDB.password = ':)'; //esto es para no mandar la contraseña en el token

        //Creamos un TOKEN         payload       seed(semilla)        fecha de expiracion (14400/60/60 = 4 horas)
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            Usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });

    });

});

module.exports = app; //exportamos el app