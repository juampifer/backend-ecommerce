const mongoose = require("mongoose");
const Category = require("./models/category.model");
const Product = require("./models/product.model");

require("dotenv").config();
// Acceso al enlace de conexion
const DATABASE = process.env.MONGO_URI;

// Función para normalizar texto eliminando tildes
const normalizeText = (text) => {
  return text
    .normalize("NFD") // Descompone caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas (tildes)
    .toLowerCase() // Convierte a minúsculas
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza caracteres no alfanuméricos por guiones
    .replace(/^-+|-+$/g, ""); // Elimina guiones al principio o al final
};

const seedDatabase = async () => {
  try {
    // Conectar a MongoDB

    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Eliminar datos existentes
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log("categorias")
    // Categorías
    const categories = [
      { name: "Notebooks", description: "Portátiles para trabajo y ocio", order: 1 },
      { name: "Placa de Video", description: "Tarjetas gráficas de alto rendimiento", order: 2 },
      { name: "Periféricos", description: "Accesorios esenciales para tu setup", order: 3 },
      { name: "PC Gamers", description: "Computadoras diseñadas para gaming", order: 4 },
    ];

    // Insertar categorías
    const categoryDocs = await Category.insertMany(
      categories.map((category) => ({
        ...category,
        slug: normalizeText(category.name), // Genera el slug con normalización
      }))
    );

    console.log("Categories inserted:", categoryDocs);

    // Productos
    const categoriesFromDb = await Category.find();
    const products = [
      {
        categoryId: categoriesFromDb.find((c) => c.name === "PC Gamers")
          ._id,
        name: "Pc Gamer",
        description: "AMD Ryzen 7 5700G + 16GB (2x8GB) 3200Mhz + Radeon VEGA",
        price: 634284,
        image:
          "https://s3-sa-east-1.amazonaws.com/saasargentina/TBwmUndFeUruWV3YuVdJ/imagen",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Periféricos"
        )._id,
        name: "Silla Gamer",
        description: "Soporta hasta 90kg.Almohadillas apoya cervical y lumbar.",
        price: 271427,
        image:
          "https://s3-sa-east-1.amazonaws.com/saasargentina/7vWaTfAX4Crg0YKDxk3g/imagen",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Periféricos"
        )._id,
        name: "Monitor Gamer",
        description: "Cooler Master GA241 24 100Hz 1Ms VA Adaptive Sync",
        price: 271427,
        image:
          "https://s3-sa-east-1.amazonaws.com/saasargentina/VCrsC7HKfRdESXySnFBD/imagen",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Placa de Video"
        )._id,
        name: "Placa de Video",
        description: "Gigabyte Radeon RX 6500 XT EAGLE 4Gb GDDR6",
        price: 257141,
        image:
          "https://s3-sa-east-1.amazonaws.com/saasargentina/eTOKGh3anBvEu6GiBHRk/imagen",
      },
      {
        categoryId: categoriesFromDb.find((c) => c.name === "Notebooks")
          ._id,
        name: "Notebook Enova",
        description: "Celeron N4020 4Gb Ssd 128Gb 14 Win11",
        price: 287799,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/Notebook-Enova-Celeron-N4020-4Gb-Ssd-128Gb-14-Win11_47676_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Placa de Video"
        )._id,
        name: "Placa de Video",
        description: "GeForce GT 1030 4Gb Msi Oc Low Profile",
        price: 110999,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/Placa-De-Video-GeForce-GT-1030-4Gb-Msi-Oc-Low-Profile_47943_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find((c) => c.name === "Notebooks")
          ._id,
        name: "Notebook Daewoo",
        description: "M15 Core i5 8Gb Ssd 512b 15.6 Win 11",
        price: 637999,
        image: "https://mexx-img-2019.s3.amazonaws.com/47893_1.jpeg?v791?v516",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Periféricos"
        )._id,
        name: "Teclado",
        description: "Logitech Pebble Keys 2 K380S Inalámbrico",
        price: 38929,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/Teclado-Logitech-Pebble-Keys-2-K380S-Inalambrico_47065_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find((c) => c.name === "PC Gamers")
          ._id,
        name: "Pc Gamer",
        description: "Intel Core i5 10400-H510-8Gb-Ssd 960GB-KIT",
        price: 404699,
        offerPrice: 385000,
        image: "https://mexx-img-2019.s3.amazonaws.com/29167_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Periféricos"
        )._id,
        name: "Silla Gamer",
        description: "Corsair TC100 Relaxed Polipiel Negro 45 cm-52 cm",
        price: 444099,
        offerPrice: 430000,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/Silla-Gamer-Corsair-TC100-Relaxed-Cuero-Negro_47342_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Periféricos"
        )._id,
        name: "Escáner",
        description: "Brother Desktop ADS-1250W Wireless 802.11 b/g/n",
        price: 542699,
        offerPrice: 498000,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/escaner-scanner_41178_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find(
          (c) => c.name === "Placa de Video"
        )._id,
        name: "Placa de Video",
        description: "GeForce RTX 4060 Ti 8Gb Gigabyte Eagle Oc",
        price: 590999,
        offerPrice: 520000,
        image:
          "https://mexx-img-2019.s3.amazonaws.com/Placa-Video-GeForce-RTX-4060-Ti-8Gb-Gigabyte-Eagle-Oc_48197_1.jpeg",
      },
      {
        categoryId: categoriesFromDb.find((c) => c.name === "Notebooks")
          ._id,
        name: "Notebook Gfast",
        description: "N-140-W Celeron N4020 4Gb Ssd 128Gb 14 Win11",
        price: 315449,
        offerPrice: 290000,
        image: "https://mexx-img-2019.s3.amazonaws.com/47999_1.jpeg",
      },
    ];

    const productDocs = await Product.insertMany(products);
    console.log("Products inserted:", productDocs);

    // Carrito
    // const cartItems = [
    //   {
    //     productId: productDocs.find(
    //       (p) => p.name === "Pc Gamer" && p.price === 404699
    //     )._id,
    //     name: "Pc Gamer",
    //     description: "Intel Core i5 10400-H510-8Gb-Ssd 960GB-KIT",
    //     price: 404699,
    //     image: "https://mexx-img-2019.s3.amazonaws.com/29167_1.jpeg",
    //     quantity: 1,
    //     offerPrice: 385000,
    //   },
    // ];

    // const cartItemDocs = await CartItem.insertMany(cartItems);
    // console.log("Cart items inserted:", cartItemDocs);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyValue);
    } else {
      console.error("Error seeding database:", error);
    }
    process.exit(1);
  }
};

seedDatabase();
