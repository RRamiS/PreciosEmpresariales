// models/supermarket.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supermarketSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Supermarket', supermarketSchema);
