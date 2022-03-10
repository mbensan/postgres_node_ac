const { Pool } = require('pg')

// creamos nuestro pool de conexiones
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'elecciones',
  password: '1005',
  max: 12,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

async function add_candidato (nombre, foto, color) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: `insert into candidatos (nombre, foto, color) values ($1, $2, $3)`,
    values: [nombre, foto, color]
  })

  return rows
}

async function update_candidato (id, nombre, foto) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: `update candidatos set nombre=$2, foto=$3 where id=$1`,
    values: [id, nombre, foto]
  })

  return rows
}

async function get_candidatos () {
  const client = await pool.connect()

  const { rows } = await client.query('select * from candidatos')

  return rows
}

async function delete_candidato (id) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: `delete from candidatos where id=$1`,
    values: [id]
  })

  return rows
}

async function add_voto(estado, votos, nombre_ganador) {
  const client = await pool.connect()

  let ganador = await client.query({
    text: `select * from candidatos where nombre=$1`,
    values: [nombre_ganador]
  })
  ganador = ganador.rows[0]

  await client.query({
    text: `insert into historial (estado, votos, ganador_id) values ($1, $2, $3)`,
    values: [estado, parseInt(votos), ganador.id]
  })

  await client.query({
    text: `update candidatos set votos=$1 where id=$2`,
    values: [ganador.votos + parseInt(votos), ganador.id]
  })
}
/*
<th>Estado</th>
<th>Votos</th>
<th>Ganador</th>
*/
async function get_historial () {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: 'select estado, historial.votos, nombre from candidatos join historial on candidatos.id = historial.ganador_id',
    rowMode: 'array'
  })
  console.log(rows);

  return rows
}


module.exports = {
  add_candidato,
  get_candidatos,
  delete_candidato,
  update_candidato,
  add_voto,
  get_historial
}
