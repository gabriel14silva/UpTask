const express = require('express');
const router = express.Router();

// Importar express validator
// const { body } = require('express-validator/check');
const { body } = require('express-validator');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

module.exports = function () {
    //ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
    );

    //Listar Proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Actualizar el Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
    );

    // Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    // Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)

    //Actualizar Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    return router;
}

