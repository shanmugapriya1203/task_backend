const Team = require('../models/Team');

const TeamUpdate = async (req, res) => {
  try {
    const { projectName, teamMemberName, updateText, dueDate } = req.body;
    const teamUpdate = new Team({
      projectName,
      teamMemberName,
      updateText,
      dueDate,
    });
    await teamUpdate.save();
    return res.status(201).json({ message: "Updated" });
  } catch (error) {
    console.error('Error Saving Team Update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllTeamUpdates = async (req, res) => {
  try {
    const teamUpdates = await Team.find();
    res.status(200).json(teamUpdates);
  } catch (error) {
    console.error('Error Fetching Team Updates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTeamUpdate = async (req, res) => {
  const updateId = req.params.updateId;

  try {
    const deletedUpdate = await Team.findByIdAndDelete(updateId);

    if (!deletedUpdate) {
      return res.status(404).json({ message: 'Team update not found' });
    }

    return res.status(200).json({ message: 'Team update deleted successfully' });
  } catch (error) {
    console.error('Error deleting team update:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { TeamUpdate, getAllTeamUpdates, deleteTeamUpdate };
