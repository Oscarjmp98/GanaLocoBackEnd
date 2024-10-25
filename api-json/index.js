const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes.js');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/v1/routes', router);

mongoose.connect(process.env.MONGODB_URI, {
  })
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Aquí puedes añadir tus rutas y modelos

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});