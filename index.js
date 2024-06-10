require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fvlvnuc.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`,
)
  .then(() => {
    console.log('Banco de dados CONECTADO!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))