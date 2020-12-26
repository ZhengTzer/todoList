// declare
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoModel = require('./models/todoModel')

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

// engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// route setting
app.get('/', (req, res) => {
  todoModel
    .find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error))
})

// port listening
app.listen(port, () => {
  console.log(`web app running at http://localhost:${port}`)
})
