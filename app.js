// declare
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

// db setting
mongoose.connect('mongodb://localhost/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongo connected!')
})

// route setting
app.get('/', (req, res) => {
  res.send('hi')
})

// port listening
app.listen(port, () => {
  console.log(`web app running at http://localhost:${port}`)
})
