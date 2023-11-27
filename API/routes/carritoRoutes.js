// carrito.js (en la carpeta routes)
const express = require('express');
const router = express.Router();
const Carrito = require('../models/carrito');
const Supermercado = require('../models/supermercado');
const Producto = require('../models/producto');

// Agregar producto al carrito
router.post('/agregar', async (req, res) => {
  const { usuarioId, productoId, cantidad } = req.body;

  try {
    // Verificar si el carrito existe para el usuario
    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      carrito = new Carrito({ usuarioId, productos: [] });
    }

    // Agregar el producto al carrito o actualizar cantidad
    const productoIndex = carrito.productos.findIndex(p => p.productoId === productoId);

    if (productoIndex !== -1) {
      carrito.productos[productoIndex].cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, cantidad });
    }

    await carrito.save();

    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para comparar precios
router.post('/comparar-precios', async (req, res) => {
  const { productos } = req.body;

  try {
    // Obtén todos los supermercados desde la base de datos con la información de productos
    const supermercados = await Supermercado.find().populate('productos.productoId');

    const resultadosComparacion = compararPrecios(supermercados, productos);
    res.json(resultadosComparacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Error al comparar precios:', error);
    throw error;
  }
});

function compararPrecios(supermercados, productos) {
  if (!supermercados || supermercados.length === 0) {
    console.error('No se encontraron datos de supermercados.');
    return {
      supermercadoMasBarato: null,
      preciosIndividuales: {},
    };
  }
  let supermercadoMasBarato = null;
  let precioTotalMasBajo = Infinity;

  supermercados.forEach(supermercado => {
    const precioTotal = productos.reduce((total, producto) => {
      const productoEnSupermercado = supermercado.productos.find(p => p.nombre === producto);

      if (productoEnSupermercado) {
        return total + productoEnSupermercado.precio;
      } else {
        console.error(`Producto '${producto}' no encontrado en el supermercado '${supermercado.nombre}'`);
        return total;
      }
    }, 0);

    if (precioTotal < precioTotalMasBajo) {
      precioTotalMasBajo = precioTotal;
      supermercadoMasBarato = supermercado;
    }
  });

  const preciosIndividuales = {};
  productos.forEach(producto => {
    preciosIndividuales[producto] = supermercados.map(supermercado => {
      const productoEnSupermercado = supermercado.productos.find(p => p.nombre === producto);
      return {
        supermercado: supermercado.nombre,
        precio: productoEnSupermercado && productoEnSupermercado.precio ? productoEnSupermercado.precio : null,
      };
    });
  });

  return {
    supermercadoMasBarato,
    preciosIndividuales,
  };


}




  



module.exports = router;