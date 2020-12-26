// declare variable
const express = require('express')
const router = express.Router()
const todoModel = require('../../models/todoModel')

router.get('/', (req, res) => {
  todoModel
    .find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error))
})

module.exports = router
