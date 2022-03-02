//import pg from 'pg'
const { Pool } = require('pg')

// creamos nuestro pool de conexiones
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

async function get_now () {
  const client = await pool.connect()
  const res = await client.query('select now()')
  client.release()
  return res.rows
}

module.exports = { get_now }