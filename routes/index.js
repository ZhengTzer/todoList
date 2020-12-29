// declare variable
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const login = require('./modules/login')

router.use('/', home)
router.use('/todos', todos)
router.use('/login', login)

module.exports = router
