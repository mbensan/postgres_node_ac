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
    allowNull: false,
    defaultValue: 'No especificado'
  }
})

const City = sql.define('City', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
    // CountryId => id de su pais
  }, 
  {  // opcionalmente podemos definir nosotros el nombre que tendrá la tabla en Postgres
    tableName: 'Cities'
  }
)

const Language = sql.define('Language', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Ahora vamos a relacionar 2 modelos (uno a muchos)
Country.hasMany(City)
City.belongsTo(Country)

// Ahora vamos a relacionar 2 modelos (muchos a muchos)
Country.belongsToMany(Language, {through: 'Speak'})
Language.belongsToMany(Country, {through: 'Speak'})

/*
Métodos implícitos que se añaden automáticamente, al relacionar 2 modelos
Country => {
  getCities()
  createCity()
  removeCity()
}
City => {
  CountryId,
  getCountry()
}
*/

sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});

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

async function buscarPais (id) {
  const pais = await Country.findByPk(id)
  console.log(pais);
}

async function buscarCiudad (id) {
  const ciudad = await City.findByPk(id)
  console.log(ciudad);
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

async function add_ciudad_brasil () {
  // Primera forma de agregar una ciudad a un pais
  /*
  const ciudad = await City.create({
    name: 'Rio de Janeiro',
    CountryId: 2
  })
  */
  // segunda forma de agregar una ciudad a un pais
  const brasil = await Country.findByPk(2)
  brasil.createCity({
    name: "Gramado"
  })
}

async function ciudades_brasil() {
  const brasil = await Country.findByPk(2)
  cities = await brasil.getCities()
  console.log(cities);
}

async function add_multilingual() {
  const chile = await Country.create({
    name: 'Chile',
    continent: 'tri'
  })
  const esp = await Language.create({
    name: 'Espanol'
  })
  const map = await Language.create({
    name: 'Mapudungun'
  })
  const arab = await Language.create({
    name: 'Arabe'
  })
  // Ahora relacionamos ambas tablas
  await chile.addLanguage(esp)
  await chile.addLanguage(map)
  await chile.addLanguage(arab)
}
add_multilingual()

