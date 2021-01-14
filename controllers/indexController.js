const fs = require('fs');
const path = require('path');
const tareasFilePath = path.join(__dirname, '../data/tasks.json');
const tareas = JSON.parse(fs.readFileSync(tareasFilePath, 'utf-8'));
const {check, validationResult, body} = require('express-validator')



module.exports = {
    home: (req, res) => {
        res.render('index', {tareas});
    },
    saveTask: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('index', {tareas, errors: errors.errors});
        } else {
            let task = {
                id: Date.now(),
                name: req.body.title
            }
            alert = false;
            tareas.push(task);
            let listaTareas = JSON.stringify(tareas);
            fs.writeFileSync(tareasFilePath, listaTareas);
            res.redirect('/')
        }
    },
    delete: (req, res) => {
        let tareasFiltradas = tareas.filter(item => item.id != req.params.id)
        let listaTareas = JSON.stringify(tareasFiltradas)
        fs.writeFileSync(tareasFilePath, listaTareas)
        res.redirect('/')
    },
    show: (req, res) => {
        let tareaMostrar = tareas.find(item => item.id == req.params.id)
        res.render('item', {tareaMostrar, tareas})
    },
    updateTask: (req, res) => {
        
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('index', {tareas, errors: errors.errors});
        } else {
            tareas.forEach(task => {
                if (task.id == req.params.id) {
                    task.id = req.params.id
                    task.name = req.body.title
                    fs.writeFileSync(tareasFilePath, JSON.stringify(tareas))
                }
            })
            res.redirect('/')
        }
    }
}