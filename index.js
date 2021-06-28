const express = require('express');
const routes = require('./routes')
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//Heloers con algunas funciones
const helpers = require('./helpers');


//Crear la conexión a la BD
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');

db.sync()
.then(() => console.log('Conectado al Servidor'))
.catch(error => console.log(error));

//Crear una app de express
const app = express();

//Agregamos express validator a toda la aplicacion
// app.use(expressValidator());
app.use(express.json());

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Anadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Pasar vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});


// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes() );

app.listen(7000);