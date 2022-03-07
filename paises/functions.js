const { Transaccion, Cuenta } = require('./models.js')

async function nueva_transaccion(cuenta_id, monto) {
  // hago algo
}

const accion = process.argv[2]

if (accion == 'nueva_t') {

  const cuenta_id = parseInt(process.argv[3])
  const monto = parseInt(process.argv[4]) 

  nueva_transaccion(cuenta_id, monto)

} else if (accion == 'listar_t') {
  // ejecuto otra funcion
} else if (accion == 'consultar') {
  const cuenta_id = parseInt(process.argv[3])
  // ....
}