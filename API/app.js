// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const supermercadoRoutes = require('./routes/supermercadoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');


const app = express();
const port = 3000;
app.use(cors());
mongoose.connect('mongodb+srv://ramiro053:fU1BaZ3oLIwSsVFj@gestordeprecios.gwughqe.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());

app.use('/supermercadosRoutes', supermercadoRoutes);
app.use('/carritosRoutes', carritoRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
