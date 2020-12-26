// declare
const mongoose = require('mongoose')
const todoModel = require('../todoModel')
const db = mongoose.connection

// db connection
mongoose.connect('mongodb://localhost/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

db.on('error', () => {
  console.log('mongo error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    todoModel.create({ name: 'name-' + i })
  }
  console.log('insert done!')
})
