// declare
const todoModel = require('../todoModel')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    todoModel.create({ name: 'name-' + i })
  }
  console.log('insert done!')
})
