const express = require('express')
const { get_now } = require('./db.js')

const app = express()
app.use(express.static('static'))

app.get('/fecha', async (req, res) => {
  const now = await get_now()
  res.json(now)
})

app.listen(3000, () => console.log('Servidor en puerto 3000'))