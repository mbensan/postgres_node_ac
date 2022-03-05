const Sequelize = require('sequelize')


const sql = new Sequelize('paises', 'postgres', '1005', {
  host: 'localhost',
  dialect: 'postgres'
})


// acá definimos las tablas de nuestra base de datos
const Country = sql.define('Country', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false
  }
})



async function crear(name, continent) {
  
  const nuevo_pais = await Country.create({
    name: name,
    continent: continent
  })
}

async function listar () {
  const paises = await Country.findAll()
  console.log(paises)
}

async function buscar (id) {
  const pais = await Country.findByPk(id)
  console.log(pais);
}

async function editar (id, nuevo_nombre) {
  const pais = await Country.findByPk(id)
  pais.name = nuevo_nombre
  await pais.save()
  console.log(pais);
}

async function borrar (id) {
  const pais = await Country.findByPk(id)
  await pais.destroy()
  console.log('Pais borrado');
}


async function init () {
  await sql.sync()
  const accion = process.argv[2]
  
  if (accion == 'crear') {
    
    crear(process.argv[3], process.argv[4])
    
  } else if (accion == 'listar') {
    
    listar()
    
  } else if (accion == 'buscar') {
  
    const id = process.argv[3]
    buscar(id)
    
  } else if (accion == 'editar') {
    
    const id = process.argv[3]
    const nuevo_nombre = process.argv[4]
    editar(id, nuevo_nombre)
    
  } else if (accion == 'borrar') {
    
    const id = process.argv[3]
    borrar(id)
  }
}

