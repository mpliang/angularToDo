var express = require('express');
var router = express.Router();

var Task = require('../models/task');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Task.find({}, function(err, data){
    res.status(err ? 400 : 200).send(err || data);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  Task.create(req.body, function(err,savedTask){
    res.status(err ? 400 : 200).send(err || savedTask);
  });
});

router.delete('/:todoId', function(req, res) {
  Task.findByIdAndRemove(req.params.todoId, function(err, deletedTask){
    res.status(err ? 400 : 200).send(err || deletedTask)
  });
});

router.put('/:todoId', function(req,res) {
  console.log('put entered', req.params.todoId);
  Task.findById(req.params.todoId, function(err, task) {
    console.log(task);
    task.completed = !task.completed;
    task.save(function(err, savedTask){
      res.send(savedTask);
    });
  });
});


module.exports = router;
