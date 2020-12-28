// declare variable
const express = require('express')
const router = express.Router()
const todoModel = require('../../models/todoModel')

// new todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const newName = String(req.body.name)
    .split(',')
    .map((todo) => ({ name: todo }))

  todoModel
    .insertMany(newName)
    .then(() => {
      return res.redirect('/')
    })
    .catch((error) => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return todoModel
    .findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return todoModel
    .findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body //try to declare same name
  return todoModel
    .findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return todoModel
    .findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
