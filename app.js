// declare
const express = require('express')
const app = express()
const port = 3000

// route setting
app.get('/', (req, res) => {
  res.send('hi')
})

// port listening
app.listen(port, () => {
  console.log(`web app running at http://localhost:${port}`)
})
