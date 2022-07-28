const asyncHandler = require('express-async-handler');
const { ProcessStep, Process } = require('../models');

const getAllProcessStep = asyncHandler(async (req, res) => {
  let { process_id } = req.params;
  const process = await Process.findOne({
    where: {
      processId: +process_id,
    },
  });
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error("You don't own this record");
  }
  const process_steps = await ProcessStep.findAll({
    where: {
      process_id: +process_id,
    },
  });
  res.status(200).json(process_steps);
});

const createProcessStep = asyncHandler(async (req, res) => {
  let { process_id } = req.params;
  const { title, duration, people } = req.body;
  const process = await Process.findOne({
    where: {
      processId: +process_id,
    },
  });
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error("You don't own this record");
  }

  if (!title || !duration || !people) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const process_step = await ProcessStep.create({
    title,
    duration,
    people,
    process_id: +process_id,
  });
  res.status(200).json(process_step);
});

const getProcessStep = asyncHandler(async (req, res) => {
  let { process_id, id } = req.params;

  const process = await Process.findOne({
    where: {
      processId: +process_id,
    },
  });
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error("You don't own this record");
  }
  const process_step = await ProcessStep.findOne({
    where: {
      process_id: +process_id,
      process_stepId: id,
    },
  });
  res.status(200).json(process_step);
});
const updateProcessStep = asyncHandler(async (req, res) => {
  const { id, process_id } = req.params;
  const { title, duration, people } = req.body;
  const process = await Process.findOne({
    where: {
      processId: +process_id,
    },
  });
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error("You don't own this record");
  }
  const process_step = await ProcessStep.findOne({
    where: {
      process_id: +process_id,
      process_stepId: id,
    },
  });

  if (!process_step) {
    res.status(400);
    throw new Error('Process Step not found');
  }

  // check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  let processFields = {};
  if (title) processFields.title = title;
  if (duration) processFields.duration = duration;
  if (people) processFields.people = people;

  const updatedProcessStep = await ProcessStep.update(processFields, {
    where: {
      process_id: +process_id,
      process_stepId: id,
    },
  });
  res.status(200).json(updatedProcessStep);
});
const deleteProcessStep = asyncHandler(async (req, res) => {
  const { id, process_id } = req.params;
  const { title, duration, people } = req.body;
  const process = await Process.findOne({
    where: {
      processId: +process_id,
    },
  });
  if (process.user_id !== req.user.userId) {
    res.status(401);
    throw new Error("You don't own this record");
  }
  const process_step = await ProcessStep.findOne({
    where: {
      process_id: +process_id,
      process_stepId: id,
    },
  });

  if (!process_step) {
    res.status(400);
    throw new Error('Process Step not found');
  }

  // check user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  await ProcessStep.destroy({
    where: {
      process_id: +process_id,
      process_stepId: id,
    },
  });
  res.status(200).json({ id });
});

module.exports = {
  getAllProcessStep,
  createProcessStep,
  getProcessStep,
  updateProcessStep,
  deleteProcessStep,
};
