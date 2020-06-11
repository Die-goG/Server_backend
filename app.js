// Es el punto de entrada para nuestra aplicacion
// Codigo que inicializa el servidor Express, base de datos, etc

// 1. Requires
var express = require('express');
var mongoose = require('mongoose'); // referenciamos a la libreria
var bodyParser = require('body-parser'); //importamos el body parse

// importamos rutas 
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

mongoose.connect('mongodb://localhost:27017/HospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', ' Online..'); //Si sucede un erro con la DB esta linea NUNCA se ejecutara
});

// 2. Inicializamos variables
var app = express();

//BodyParser :extrae toda la parte del cuerpo de una secuencia de solicitud entrante y la expone en req.body
//           :Simplifica la solicitud
//           :Toma la inforacion de POST y nos crea un objeto javascript para usarlo en cualquier lugar 
// Middleware :  algo que se ejecuta antes de que se resuelvan otras rutas
// parse application/x-www-form-urlencoded
// use es usa para establecer el middleware, esto agrega dentro de express un conjunto de middleware, y podemos invocar uno a uno
//                  https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
//                  https://apuntes.de/nodejs-desarrollo-web/body-parser/#gsc.tab=0
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rutas, estan definidos arriba
// Middleware :  algo que se ejecuta antes de que se resuelvan otras rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// 3. Escuchamos las peticiones por el pueto 3000
app.listen(3000, () => {
    console.log('Express server en el puerto 3000: \x1b[32m%s\x1b[0m', ' Online..');

});