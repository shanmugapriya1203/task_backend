const express = require('express');
const router = express.Router();

const { saveTask, getTasksByUserEmail, deleteTask, updateTask } = require('../controllers/taskController');

router.post('/savetask', saveTask);
router.get('/tasksByUserEmail/:userEmail',  getTasksByUserEmail);
router.delete('/:taskId',deleteTask)
router.put('/update/:taskId',updateTask)
module.exports = router;
