// declare
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoModel = require('./models/todoModel')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// route setting
app.use(routes)

// port listening
app.listen(port, () => {
  console.log(`web app running at http://localhost:${port}`)
})
