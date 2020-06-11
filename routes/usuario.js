var express = require('express');
var app = express();
var bcrypt = require('bcryptjs'); //modulo para encriptar las contraseñas en una sola via , lo instalamos con npm i bcryptjs
var jwt = require('jsonwebtoken');
//var SEED = require('../config/config').SEED; //importamos el archivo con el seed 
var mdAutenticacion = require('../middleware/autentication'); //importamos el middleware


// Para poder usar el esquema definido (models)
var Usuario = require('../models/usuario');

//===================================================================
//Obtenemos todos los usuarios  
//===================================================================
// Direccionamineto para responder una peticion GET
// '/' :cuando alguien se dirija a la ruta raiz de usuarios ose a /usuario
app.get('/', (rep, res, next) => {

    // {} = quiero que busques todo
    // 'nombre email img role' = defino los campos que quiero ver
    Usuario.find({}, 'nombre email img role password') //find es de mongoose 
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });

});

// ================================================
// Opcion 1. Verificar token --- Middleware
// ================================================
// Todas las peticiones a partir de este punto, seran verificadas con un token

// app.use('/', (req, res, next) => { //toda ruta va a pasar por aqui PRIMERO

//     var token = req.query.token; //recibimo el token por la url, si el usuario no envio algun token, el token va a ser undefined   
//     //verificamos validez del token
//     jwt.verify(token, SEED, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ //401 : no autorizado
//                 ok: false,
//                 mensaje: 'Token incorrecto',
//                 errors: err
//             });
//         }

//         next(); //puedes continuar con las siguiente lineas de codigo
//     });


// });


// ================================================
// Actualizar usuario
// ================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => { //Tenemos que envir un Id para que funcione

    var id = req.params.id; //obtenemos el id enviar por la url
    var body = req.body;

    //Buscamos al usuario con el id ingresado
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuario) //si no viene nada en el usuario
        {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + 'no existe',
                errors: { mensaje: 'No existe un usuario con ese ID' }
            });

        }

        //si no existe errores y si viene un usuario los valores son asignados

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuarios',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({ //erro 201= recurso creado
                ok: true,
                usuario: usuarioGuardado //nombre de la propiedad que quiero retornar
            });
        });
    });
});

// ================================================
//  Crea un nuevo usuario
// ================================================
// Direccionamineto para responder una peticion POST
// '/' :cuando alguien se dirija a la ruta raiz de usuarios osea /usuario
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    //Utilizamos libreria body-parser
    //https://github.com/expressjs/body-parser
    // instalamos y luego hacemos las refencias en /app.js
    var body = req.body;
    //definicion para crear un nuevo usuario
    var usuario = new Usuario({ //el Usuario hace referencia al modelo de datos que creamos // linea 5
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => { //aqui recibo un callback, es decir una funcion que regresa cuando se graba el usuario

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({ //erro 201= recurso creado
            ok: true,
            usuario: usuarioGuardado, //nombre de la propiedad que quiero retornar
            usuariotoken: req.usuario //vemos que usuario realizo la creacion del usuario
        });

    });

});

// ================================================
//  Eliminar usuario por id
// ================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id; //.id : es que tenemos por url

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuarios',
                errors: err
            });
        }
        res.status(200).json({ //erro 201= recurso creado
            ok: true,
            usuario: usuarioBorrado //nombre de la propiedad que quiero retornar
        });

    });

});



// para que este archivo pueda ser utlizado fuera
module.exports = app;