var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const {check, validationResult, body} = require('express-validator')

/* GET users listing. */
router.get('/', indexController.home);
router.post('/tasks', [
    check('title').isLength( {min:3} ).withMessage('El texto debe contener al menos 3 caracteres'),
], indexController.saveTask)
router.delete('/tasks/:id', indexController.delete)
router.get('/tasks/:id', indexController.show)
router.put('/tasks/edit/:id', [
    check('title').isLength( {min:3} ).withMessage('El texto debe contener al menos 3 caracteres'),
],indexController.updateTask)
module.exports = router;
