const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongo connected!')
})

// export for todoSeeder.js
module.exports = db
