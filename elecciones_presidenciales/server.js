const express = require('express')
const { add_candidato, get_candidatos,
  delete_candidato, update_candidato, add_voto, get_historial }
 = require('./db.js')

const app = express()

app.use(express.static('static'))

// Acá definimos nuestras rutas
app.get('/candidatos', async (req, res) => {
  candidatos = await get_candidatos()
  res.json(candidatos)
})

app.post('/candidato', async (req, res) => {
  let body = ''

  req.on('data', data => body += data )
  
  req.on('end', async () => {
    body = JSON.parse(body)
    console.log(body)

    await add_candidato(body.nombre, body.foto, body.color)

    res.json({todo: 'ok'})
  })
})

app.put('/candidato', async (req, res) => {
  let body = ''

  req.on('data', data => body += data )
  
  req.on('end', async () => {
    body = JSON.parse(body)

    await update_candidato(body.id, body.name, body.img)

    res.json({todo: 'ok'})
  })
})

app.delete('/candidato', async (req, res) => {
  const id = parseInt(req.query.id)
  await delete_candidato(id)
  res.json({todo: 'ok'})
})

app.get('/historial', async (req, res) => {
  const historial = await get_historial()
  res.json(historial)
})

app.post('/votos', async (req, res) => {
  let body = ''

  req.on('data', data => body += data )
  
  req.on('end', async () => {
    body = JSON.parse(body)

    console.log(body);
    await add_voto(body.estado, body.votos, body.ganador)

    res.json({todo: 'ok'})
  })
})


app.listen(3000, () => console.log('Servidor ejecutando en el puerto 3000'))
