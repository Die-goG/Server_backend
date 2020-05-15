// Es el punto de entrada para nuestra aplicacion
// Codigo que inicializa el servidor Express, base de datos, etc

// 1. Requires
var express = require('express');
var mongoose = require('mongoose'); // referenciamos a la libreria

// usamos la libreria Mongoose
// Establecemos conexion con MongoDB
//mongoose.connect("mongodb://localhost:27017/hospitalDB", { useNewUrlParser: true });
// mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', ' Online..'); //Si sucede un erro con la DB esta linea NUNCA se ejecutara
});

// 2. Inicializamos variables
var app = express();

// Rutas
app.get('/', (rep, res, next) => {
    res.status(403).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// 3. Escuchamos las peticiones por el pueto 3000
app.listen(3000, () => {
    console.log('Express server en el puerto 3000: \x1b[32m%s\x1b[0m', ' Online..');

});