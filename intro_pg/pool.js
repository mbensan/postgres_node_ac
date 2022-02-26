//import pg from 'pg'
const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'jeans',
  password: '1005',
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})
// ejemplo de consulta con Pool
async function consultar() {
  const client = await pool.connect()
  const res = await client.query('select * from ropa')
  console.log(res.rows)
  client.release()
  pool.end()
}
// consultar()

// Ejemplo de Query con Strings Parametrizados
async function ingresar (nombre, color,  talla) {
  const client = await pool.connect()
  const res = await client.query(
    `insert into ropa (nombre, color, talla) values ($1, $2, $3)`,
    [nombre, color, talla]
  ) 
  const res2 = await client.query({
    text: `insert into ropa (nombre, color, talla) values ($1, $2, $3)`,
    values: [nombre, color, talla]
  })
  // res y res2 son ambas formas válidas de eecutar una sentencia SQL
  client.release()
  pool.end()
}
ingresar('Camisa', 'Celeste', 'Skinny')
