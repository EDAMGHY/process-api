const { Process } = require('../models');
const asyncHandler = require('express-async-handler');

const getAllProcess = asyncHandler(async (req, res) => {
  const processes = await Process.findAll({
    where: { user_id: req.user.userId },
  });
  res.status(200).json(processes);
});
const createProcess = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const process = await Process.create({
    title,
    description,
    user_id: req.user.userId,
  });
  res.status(200).json(process);
});
const getProcess = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const process = await Process.findAll({
    where: { processId: id, user_id: req.user.userId },
  });
  res.status(200).json(process);
});
const updateProcess = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const process = await Process.findByPk(id);
  if (!process) {
    res.status(400);
    throw new Error('Process not found');
  }

  // check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // make sure the logged user matches the goal user
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error('User not Authorized');
  }
  let processFields = {};
  if (title) processFields.title = title;
  if (description) processFields.description = description;

  const updatedProcess = await Process.update(processFields, {
    where: { processId: id, user_id: req.user.userId },
  });
  res.status(200).json(updatedProcess);
});
const deleteProcess = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const process = await Process.findByPk(id);
  if (!process) {
    res.status(400);
    throw new Error('Process not found');
  }

  // check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // make sure the logged user matches the goal user
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error('User not Authorized');
  }
  await Process.destroy({ where: { processId: id, user_id: req.user.userId } });
  res.status(200).json({ id });
});

module.exports = {
  getAllProcess,
  createProcess,
  getProcess,
  updateProcess,
  deleteProcess,
};
