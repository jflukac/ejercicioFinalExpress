var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET users listing. */
router.get('/', indexController.home);
router.post('/tasks', indexController.saveTask)
router.post('/tasks/:id', indexController.delete)
router.get('/tasks/:id', indexController.show)
router.post('/tasks/edit/:id', indexController.updateTask)
module.exports = router;
