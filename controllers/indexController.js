const fs = require('fs');
const path = require('path');
const tareasFilePath = path.join(__dirname, '../data/tasks.json');
const tareas = JSON.parse(fs.readFileSync(tareasFilePath, 'utf-8'));

let alert = false

module.exports = {
    home: function(req, res, next) {
        res.render('index', {tareas, alert});
    },
    saveTask: (req, res, next) => {
        if (req.body.title.length < 3) {
            alert = true;
            res.render('index', {tareas, alert});
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
        res.render('item', {tareaMostrar, tareas, alert})
    },
    updateTask: (req, res) => {
        if (req.body.title.length < 3) {
            let alert = true;
            res.redirect('/', {alert});
        }
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