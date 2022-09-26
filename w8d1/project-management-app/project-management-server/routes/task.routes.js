const router = require("express").Router();
// const mongoose = require('mongoose');
 
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');
 
//  POST /api/tasks  -  Creates a new task
router.post('/tasks', (req, res, next) => {
  const { title, description, projectId } = req.body;
 
  Task.create({ title, description, project: projectId })
    .then(newTask => {
      return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } }, {new: true} );
    })
    .then(project => res.json(project))
    .catch(err => res.json(err));
});
 
// edit a new task
// GET /api/tasks/:taskId - Send a specific project

router.get('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

  Task.findById(taskId)
      .then(task => res.json(task))
      .catch(err => console.log(err))
})

// PUT /api/tasks/:taskId - Edit/Update a specific project

router.put('/tasks/:taskId', (req, res) =>{
  const { taskId } = req.params;
  

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  const { title, description, project } = req.body;

  Task.findByIdAndUpdate(projectId, {title, description}, {new: true}) // {new: true} is so we get the updated data returned from the query
      .then(task => res.json(task))
      .catch(err => console.log(err))
})

// DELETE /api/tasks/:taskId = Delete a specific project

router.delete('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  // Project.findByIdAndDelete(projectId)
  //     .then(()=> res.json({message: 'Project was successfully deleted'}))
  //     .catch(err => console.log(err))

  Task.findByIdAndRemove(taskId)
      .then(task => res.json({message: `Project with the id ${task._id} was successfully deleted`}))
      .catch(err => console.log(err))
})


module.exports = router;