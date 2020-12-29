// initial declare
const express = require('express')
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// reconfigure
const routes = require('./routes')
require('./config/mongoose')

// final app usage
const app = express()

// engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// route setting
app.use(routes)

// port listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
