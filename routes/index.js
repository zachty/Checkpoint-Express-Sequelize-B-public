const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/users', (req, res, next) => {
  try {
    res.send(todos.listPeople());
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/users/:name/tasks', (req, res, next) => {
  try {
    const query = req.query;
    let list = todos.list(req.params.name);
    if (!list) res.status(404).send('Page not found!');
    else {
      if (query.status === 'complete') {
        list = list.filter((task) => task.complete);
      } else if (query.status === 'active') {
        list = list.filter((task) => !task.complete); //error here
      }
      res.send(list);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/users/:name/tasks', (req, res, next) => {
  try {
    const data = req.body;
    if (!data.content) res.sendStatus(400);
    else {
      todos.add(req.params.name, data);
      res.status(201).send(data);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/users/:name/tasks/:index', (req, res, next) => {
  try {
    todos.complete(req.params.name, req.params.index);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:name/tasks/:index', (req, res, next) => {
  try {
    todos.remove(req.params.name, req.params.index);
    res.status(204).send('Deleted');
  } catch (error) {
    next(error);
  }
});
