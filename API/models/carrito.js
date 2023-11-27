const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  productoId: { type: Schema.Types.ObjectId, ref: 'Producto' },
  nombre: String,
  precio: Number,
  cantidad: Number,
});

const carritoSchema = new Schema({
  usuarioId: String,
  productos: [productoSchema],

});

module.exports = mongoose.model('Carrito', carritoSchema);
