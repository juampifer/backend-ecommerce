// importanmos mongoose para habilitar metodos y propiedades para conectarnos
// con la base de datos
const mongoose = require('mongoose');
require('dotenv').config()

// Acceso al enlace de conexion
const DATABASE = process.env.MONGO_URI

// Funcion para conectarnos a la DB
const connect = async () => {
    try {
        mongoose.connect(DATABASE)
        console.log('Base de datos conectada.')
    } catch (error) {
        console.log(error)
    }
}

connect()