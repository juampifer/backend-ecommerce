const express = require('express');
const cors = require('cors');
const productRoutes = require('../routes/product.routes');

// Configurar el servidor
const server = express();

// Configurar CORS para permitir solicitudes desde el frontend
server.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Le permite a express entender el json del body de las peticiones
server.use(express.json())

// Configuracion de los routers -> delegado -> routers
server.get('/', (request, response) => {
    response.send("Bienvenidos a mi servidor")
})

// Ejecutar los routers
server.use('/products', productRoutes);

module.exports = server;