const { Client } = require('pg')


/* const client = new Client({
  connectionString: 'postgresql://postgres:1005@localhost:5432/jeans'
}); */
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'jeans',
  password: '1005',
  port: 5432
})

client.connect(err => {
  if (err) {
    console.log('Error en la conexión a postgres', error);
  }
})

async function consulta() {
  const res = await client.query('select * from ropa limit 10');
  console.log('Resultado', res.rows);
  console.log('Columnas', res.fields);
  client.end()
}
async function insercion () {
  const res = await client.query(
    "insert into ropa (nombre, color, talla) values ('pantalon', 'azul', '46') returning *"
  )
  console.log('Resultado', res.rows);
  client.end()
}
// consulta()
insercion()


