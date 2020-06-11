var express = require('express');
var app = express();

//Direccionamiento
// Rutas para realizar una peticion GET al server
app.get('/', (rep, res, next) => {

    //res.send("Hola");

    res.status(403).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// para que este archivo pueda ser utlizado fuera y el app pueda ser visible
module.exports = app;