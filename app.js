// declare
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoModel = require('./models/todoModel')
const bodyParser = require('body-parser')

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

// route setting
app.get('/', (req, res) => {
  todoModel
    .find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error))
})

// new todo
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const newName = req.body.name
  return todoModel
    .create({ name: newName }) // or shorten to just name if same name
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return todoModel
    .findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// edit
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return todoModel
    .findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const editName = req.body.name
  return todoModel
    .findById(id)
    .then((todo) => {
      todo.name = editName
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error))
})

// port listening
app.listen(port, () => {
  console.log(`web app running at http://localhost:${port}`)
})
