# Carrito de Compras - Backend

Este proyecto es el backend de un sistema de carrito de compras, desarrollado con Node.js, Express.js y MongoDB. Proporciona una API RESTful para gestionar productos, usuarios, y pedidos.

## Tabla de Contenidos
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## Características
- CRUD para productos.
- Integración con MongoDB para persistencia de datos.
- API RESTful siguiendo las mejores prácticas.
- Código modular y organizado con separación de responsabilidades.

---

## Requisitos Previos
Asegúrate de tener instalados los siguientes programas:
- [Node.js](https://nodejs.org/) (v14 o superior recomendado).
- [MongoDB](https://www.mongodb.com/) (local o en la nube como MongoDB Atlas).

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/juampifer/backend-ecommerce.git
   cd backend-ecommerce
2.	Instala las dependencias:
    ```bash
    npm install
3.	Configura las variables de entorno:
    Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
    ```env
    MONGO_URI=mongodb://localhost:27017/carrito-db
    PORT=5000
    JWT_SECRET=tuClaveSecreta
4.	Llena la base de datos:
    ```bash
    npm run seed
5.	Inicia el servidor:
    ```bash
    npm run dev
## Uso

Iniciar el servidor

    Ejecuta el siguiente comando para iniciar el servidor en modo de desarrollo: 
    npm run dev
    El servidor estará disponible en http://localhost:5000.

## Endpoints Disponibles

### Productos
- **GET** `/products`: Obtiene todos los productos.
- **GET** `/products/:id`: Obtiene un producto por ID.
- **POST** `/products`: Crea un nuevo producto.
- **PUT** `/products/:id`: Actualiza un producto.
- **DELETE** `/products/:id`: Elimina un producto.

## Estructura del Proyecto

```plaintext
src/
├── controllers/        # Controladores que gestionan las solicitudes HTTP
├── models/             # Modelos de datos (Mongoose)
├── routes/             # Definición de rutas de la API
├── services/           # Lógica de negocio
├── database/           # Configuración de la base de datos
├── app.js              # Punto de entrada del servidor