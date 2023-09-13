// controllers/supermarkets.js
const Supermarket = require('../models/supermarket');

// Obtener todos los supermercados
exports.getAllSupermarkets = async (req, res) => {
  try {
    const supermarkets = await Supermarket.find().populate('products');
    res.json(supermarkets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los supermercados.' });
  }
};

// Crear un nuevo supermercado
exports.createSupermarket = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newSupermarket = new Supermarket({ name, location });
    await newSupermarket.save();
    res.status(201).json(newSupermarket);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el supermercado.' });
  }
};

// Actualizar un supermercado
exports.updateSupermarket = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const updatedSupermarket = await Supermarket.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );
    res.json(updatedSupermarket);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el supermercado.' });
  }
};

// Eliminar un supermercado
exports.deleteSupermarket = async (req, res) => {
  try {
    const { id } = req.params;
    await Supermarket.findByIdAndDelete(id);
    res.json({ message: 'Supermercado eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el supermercado.' });
  }
};
