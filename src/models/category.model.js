const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    order: { 
        type: Number, 
        default: 0, 
        required: true, 
        min: [0, "El orden debe ser un número positivo"] 
    },
  },
  { timestamps: true }
);

// Middleware para generar slugs únicos antes de guardar
categorySchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        let baseSlug = this.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        let uniqueSlug = baseSlug;
        let counter = 1;

        while (await mongoose.models.Category.exists({ slug: uniqueSlug })) {
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        this.slug = uniqueSlug;
    }
    next();
});

// Transformar `_id` a `id` en las respuestas JSON
categorySchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("Category", categorySchema);