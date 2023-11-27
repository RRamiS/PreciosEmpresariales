const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productoSchema = new Schema({
 
  nombre: String,
  precio: Number,
  cantidad: Number,

});


mongoose.model('Producto', productoSchema);
