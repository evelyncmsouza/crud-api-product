require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.json())

const productRoutes = require('./routes/productRoutes')
app.use('/product', productRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fvlvnuc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=APICluster`,
)
  .then(() => {
    console.log('Banco de dados CONECTADO!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))