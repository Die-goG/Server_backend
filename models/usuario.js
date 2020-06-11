// Vamos a definir las rutas necesarias para trabajar con servicios REST 
// Ejem:  Login, crear usuarios, ver usuarios, etc

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); //importamos mongoose-unique-validator para controlar que los datos ingresado
// no sean los mismo, lo instalamos con npm i mongoose-unique-validator

var Schema = mongoose.Schema; // definimos la funcion Schema

//creamos un objeto que me permita controlar los roles que voy a permitir
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    messsage: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El email es necesario']
    },
    password: {
        type: String,
        require: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    }

});

usuarioSchema.plugin(uniqueValidator, { messsage: '{PATH} debe ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);