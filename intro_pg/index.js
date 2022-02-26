import pg from 'pg'
import chalk from 'chalk'

/* const client = new Client({
  connectionString: 'postgresql://postgres:1005@localhost:5432/jeans'
}); */
const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'jeans',
  password: '1005',
  port: 5432
})

client.connect(err => {
  if (err) {
    console.log(chalk.blue('Error en la conexión a postgres', error))
  }
})

async function consulta() {
  const res = await client.query('select * from ropa limit 10');
  console.log('Resultado', res.rows);
  console.log('Columnas', res.fields);
  client.end()
}

async function insert_complejo(color, talla) {
  await client.query(`insert into ropa (nombre, color, talla) values ('Polera "Homero"', '${color}', '${talla}')`)
}

async function insercion () {
  const res = await client.query(
    "insert into ropa (nombre, color, talla) values ('polera', 'rayas', 'M') returning *"
  )
  console.log('Resultado', res.rows);
  client.end()
}

async function actualizar() {
  await client.query("update ropa set talla='M' where nombre='pantalon'")
  client.end()
}

async function borrado() {
  const res = await client.query('delete from ropa')
  console.log(res.rows);
  client.end()
}

// consulta()
// insercion()
// actualizar()
borrado()


