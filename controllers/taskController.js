const Task = require("../models/Tasks");

const saveTask = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const { title, description, duedate } = req.body;

    const task = new Task({
      title,
      description,
      duedate,
      owner: userEmail,
    });

    await task.save();

    return res.status(201).json({ message: "Task Saved Successfully" });
  } catch (error) {
    console.error("Error Saving Task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasksByUserEmail = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    const tasks = await Task.find({ owner: userEmail });

    const tasksWithId = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      duedate: task.duedate,
    }));

    return res.status(200).json(tasksWithId);
  } catch (error) {
    console.error("Error Fetching Tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const updatedTaskData = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (updatedTaskData.title) {
      task.title = updatedTaskData.title;
    }
    if (updatedTaskData.description) {
      task.description = updatedTaskData.description;
    }
    if (updatedTaskData.duedate) {
      task.duedate = updatedTaskData.duedate;
    }

    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveTask, getTasksByUserEmail, deleteTask, updateTask };
