// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { link, details, extraFields } = req.body;
  try {
    const newTask = new Task({
      link,
      details,
      extraFields,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update task status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const updateData = { status };
    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
