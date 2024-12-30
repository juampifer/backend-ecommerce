const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, default: null },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Transformar `_id` a `id` en las respuestas JSON
productSchema.set('toJSON', {
  transform: (doc, ret) => {
      ret.id = ret._id; // Agregar el campo `id`
      delete ret._id; // Eliminar `_id`
      delete ret.__v; // Eliminar el campo `__v`
  },
});

module.exports = mongoose.model("Product", productSchema);
