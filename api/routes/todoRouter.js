const express = require('express');
const Todo = require('../models/Todo');

const todoRouter = express.Router();

todoRouter.route('/')
.get((req, res, next) => {
    Todo.find()
    .then(todos => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applications/json');
        res.json(todos);
    })
    .catch(err => next(err));
});

todoRouter.route('/new')
.post((req, res, next) => {
    Todo.create(req.body)
    .then(todo => {
        console.log('Todo Created', todo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    })
    .catch(err => next(err));
});

todoRouter.route('/complete/:id')
.get((req, res, next) => {
    const todo = Todo.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, todo.complete = !todo.complete,
    todo.save())
    .then(todo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(todo);
    })
    .catch(err => next(err));
});

todoRouter.route('/delete/:id')
.delete((req, res, next) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = todoRouter;