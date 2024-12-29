const express = require('express');
// const router = require('../routes/routes');
const productRoutes = require('../routes/product.routes');

// Configurar el servidor
const server = express();

// Le permite a express entender el json del body de las peticiones
server.use(express.json())

// Configuracion de los routers -> delegado -> routers
server.get('/', (request, response) => {
    response.send("Bienvenidos a mi servidor")
})

// Ejecutar los routers
server.use('/products', productRoutes);

module.exports = server;