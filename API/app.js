const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

/* Xf96neTTU8eT3VEf  PASS DB*/

// Middleware
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://RRamiS:Xf96neTTU8eT3VEf@preciosdinamicos.vxdklfn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


// Rutas de autenticación y gestión de supermercados y productos
const authRoutes = require('./routes/auth');
const supermarketRoutes = require('./routes/supermarkets');
const productRoutes = require('./routes/products');

app.use('/api/auth', authRoutes);
app.use('/api/supermarkets', supermarketRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
